using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class TablesCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CriadoEm",
                table: "livros");

            migrationBuilder.RenameColumn(
                name: "Nome",
                table: "livros",
                newName: "Titulo");

            migrationBuilder.AddColumn<int>(
                name: "Quantidade",
                table: "livros",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "emprestimos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    LivroId = table.Column<int>(type: "INTEGER", nullable: false),
                    LeitorId = table.Column<int>(type: "INTEGER", nullable: false),
                    DataEmprestimo = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DataDevolucao = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_emprestimos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "leitores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    Telefone = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_leitores", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "emprestimos");

            migrationBuilder.DropTable(
                name: "leitores");

            migrationBuilder.DropColumn(
                name: "Quantidade",
                table: "livros");

            migrationBuilder.RenameColumn(
                name: "Titulo",
                table: "livros",
                newName: "Nome");

            migrationBuilder.AddColumn<DateTime>(
                name: "CriadoEm",
                table: "livros",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
