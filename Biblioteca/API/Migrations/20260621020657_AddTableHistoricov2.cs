using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddTableHistoricov2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "historico",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    LivroId = table.Column<string>(type: "TEXT", nullable: false),
                    LeitorId = table.Column<string>(type: "TEXT", nullable: false),
                    DataEmprestimo = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DataDevolucao = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_historico", x => x.Id);
                    table.ForeignKey(
                        name: "FK_historico_leitores_LeitorId",
                        column: x => x.LeitorId,
                        principalTable: "leitores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_historico_livros_LivroId",
                        column: x => x.LivroId,
                        principalTable: "livros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_historico_LeitorId",
                table: "historico",
                column: "LeitorId");

            migrationBuilder.CreateIndex(
                name: "IX_historico_LivroId",
                table: "historico",
                column: "LivroId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "historico");
        }
    }
}
