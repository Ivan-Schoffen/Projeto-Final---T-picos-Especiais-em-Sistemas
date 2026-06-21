using System;

public class Livro
{
    public String Id { get; set; } = Guid.NewGuid().ToString();
    public String? Titulo { get; set; }
    public String? Autor { get; set; }
    public int Quantidade { get; set; }

}