using System;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDbContext : DbContext
{
    public DbSet<Livro> livros { get; set; }
    public DbSet<Leitor> leitores { get; set; }
    public DbSet<Emprestimo> emprestimos { get; set; }
    public DbSet<Historico> historicos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=Livraria.db");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Emprestimo>()
        .HasOne(e => e.Livro)
        .WithMany()
        .HasForeignKey(e => e.LivroId);

    modelBuilder.Entity<Emprestimo>()
        .HasOne(e => e.Leitor)
        .WithMany()
        .HasForeignKey(e => e.LeitorId);
}

}