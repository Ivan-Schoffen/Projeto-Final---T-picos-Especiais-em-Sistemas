public class Emprestimo
{
    public String Id { get; set; } = Guid.NewGuid().ToString();
    required public String LivroId { get; set; }
    public Livro? Livro { get; set; }
    required public String LeitorId { get; set; }
    public Leitor? Leitor { get; set; }
    public DateTime DataEmprestimo { get; set; } = DateTime.Now;
    public DateTime? DataDevolucao { get; set; }
}