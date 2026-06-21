public class Leitor
{
    public String Id { get; set; } = Guid.NewGuid().ToString();
    public string? Nome { get; set; }
    public string? Email { get; set; }
    public string? Telefone { get; set; }
}