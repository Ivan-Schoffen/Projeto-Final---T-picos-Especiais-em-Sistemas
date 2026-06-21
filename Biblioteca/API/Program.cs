using API.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

//Funcionalidades Livro

app.MapPost("/api/livro/cadastrar", ([FromBody] Livro livro, [FromServices] AppDbContext ctx) =>
{
    Livro? cadastrado = ctx.livros.FirstOrDefault(x => x.Titulo == livro.Titulo);

    if (cadastrado is not null)
    {
        return Results.Conflict("Este livro ja esta cadastrado!");
    }
    
    ctx.livros.Add(livro);
    ctx.SaveChanges();
    return Results.Ok("Livro cadastrado com sucesso!");

});

app.MapGet("/api/livro/listar", ([FromServices] AppDbContext ctx) =>
{
    if(ctx.livros.Any())
    {
        return Results.Ok(ctx.livros.ToList());
    }

    return Results.NotFound("Nenhum livro cadastrado");
});

app.MapGet("/api/produto/buscar/{id}",
    ([FromRoute] string id,
    [FromServices] AppDbContext ctx) =>
{
    Livro? resultado = ctx.livros.Find(id);

    if (resultado is not null)
    {
        return Results.Ok(resultado);
    }

    return Results.NotFound("Livro não encontrado!");
});

app.MapPost("/api/livro/deletar/{id}", ([FromRoute] String id, [FromServices] AppDbContext ctx) =>
{
    Livro? res = ctx.livros.Find(id);

    if(res is not null)
    {
        ctx.livros.Remove(res);
        ctx.SaveChanges();
        return Results.Ok("Livro deletado!");
    }

    return Results.NotFound("Livro não encontrado!");
});

//Funcionalidades Leitor
app.MapPost("/api/leitor/cadastrar", ([FromBody] Leitor leitor, [FromServices] AppDbContext ctx) =>
{
    Leitor? cadastrado = ctx.leitores.FirstOrDefault(x => x.Nome == leitor.Nome);

    if (cadastrado is not null)
    {
        return Results.Conflict("Este Leitor ja esta cadastrado!");
    }
    
    ctx.leitores.Add(leitor);
    ctx.SaveChanges();
    return Results.Ok("Leitor cadastrado com sucesso!");

});

app.MapGet("/api/leitor/listar", ([FromServices] AppDbContext ctx) =>
{
    if(ctx.leitores.Any())
    {
        return Results.Ok(ctx.leitores.ToList());
    }

    return Results.NotFound("Nenhum leitor cadastrado");
});

app.MapGet("/api/leitor/buscar/{id}",
    ([FromRoute] string id,
    [FromServices] AppDbContext ctx) =>
{
    Leitor? resultado = ctx.leitores.Find(id);

    if (resultado is not null)
    {
        return Results.Ok(resultado);
    }

    return Results.NotFound("Leitor não encontrado!");
});

app.MapPost("/api/leitor/alterar", ([FromBody] Leitor leitorAlterado, [FromServices] AppDbContext ctx) =>
{
    Leitor? res = ctx.leitores.Find(leitorAlterado.Id);

    if(res is not null)
    {
        res.Nome = leitorAlterado.Nome;
        res.Email = leitorAlterado.Email;
        res.Telefone = leitorAlterado.Telefone;
        ctx.leitores.Update(res);
        ctx.SaveChanges();
        return Results.Ok("Leitor alterado com suscesso!");
    }

    return Results.NotFound("Leitor não encontrado!");
});

app.MapPost("/api/leitor/deletar/{id}", ([FromRoute] String id, [FromServices] AppDbContext ctx) =>
{
    Leitor? res = ctx.leitores.Find(id);

    if(res is not null)
    {
        ctx.leitores.Remove(res);
        ctx.SaveChanges();
        return Results.Ok("Leitor deletado!");
    }

    return Results.NotFound("Leitor não encontrado!");
});

//Emprestimo
app.MapPost("/api/emprestimo/emprestar", ([FromServices] AppDbContext ctx, [FromBody] Emprestimo emprestimo) =>
{
    Livro? livro = ctx.livros.Find(emprestimo.LivroId);
    Leitor? leitor = ctx.leitores.Find(emprestimo.LeitorId);

    if(livro is not null && leitor is not null)
    {
        if(livro.Quantidade > 0)
        {
            livro.Quantidade--;
            ctx.livros.Update(livro);
            ctx.emprestimos.Add(emprestimo);
            ctx.SaveChanges();

            return Results.Ok("Emprestimo efetuado com suscesso");
        }
        return Results.BadRequest("Livro indisponivel.");
    }
    return Results.NotFound("Livro ou leitor não encontrado.");
});

app.MapGet("/api/emprestimo/emprestados", ([FromServices] AppDbContext ctx) =>
{
    var emprestimos = ctx.emprestimos
        .Include(e => e.Livro)
        .Include(e => e.Leitor)
        .Select(e => new
        {
            Id_Emprestimo = e.Id,
            Titulo_Livro = e.Livro!.Titulo,
            Nome_Leitor = e.Leitor!.Nome,
            Data_Emprestimo = e.DataEmprestimo
        })
        .ToList();

    if (!emprestimos.Any()) {
        return Results.NotFound("Nenhum emprestimo encontrado!");
    }
    return Results.Ok(emprestimos);
});

app.MapPost("/api/emprestimo/devolver/{id}", ([FromRoute] String id, [FromServices] AppDbContext ctx) =>
{
    var emprestimo = ctx.emprestimos.Find(id);

    if (emprestimo is null)
    {
        return Results.NotFound("Empréstimo não encontrado ou já devolvido.");
    }

    var livro = ctx.livros.Find(emprestimo.LivroId);

    if (livro is null)
    {
        return Results.NotFound("Livro associado a este empréstimo não foi encontrado.");
    }

    var historico = new Historico
    {
        LivroId = emprestimo.LivroId,
        LeitorId = emprestimo.LeitorId,
        DataEmprestimo = emprestimo.DataEmprestimo,
        DataDevolucao = DateTime.UtcNow
    };

    livro.Quantidade++;
    ctx.historicos.Add(historico);
    ctx.emprestimos.Remove(emprestimo);

    ctx.SaveChanges();

    return Results.Ok("Livro devolvido com sucesso e registrado no histórico.");
});

app.MapGet("/api/historico/listar", ([FromServices] AppDbContext ctx) => {
    var historico = ctx.historicos
        .Include(e => e.Livro)
        .Include(e => e.Leitor)
        .Select(e => new
        {
            Id_historico = e.Id,
            Titulo_Livro = e.Livro!.Titulo,
            Nome_Leitor = e.Leitor!.Nome,
            Data_Emprestimo = e.DataEmprestimo,
            Data_Devolucao = e.DataDevolucao
        })
        .ToList();

    if (!historico.Any()) {
        return Results.NotFound("Nenhum emprestimo encontrado!");
    }
    return Results.Ok(historico);
});

app.Run();
