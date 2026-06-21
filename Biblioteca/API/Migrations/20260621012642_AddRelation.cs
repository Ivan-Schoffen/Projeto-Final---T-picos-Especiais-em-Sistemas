using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_emprestimos_LeitorId",
                table: "emprestimos",
                column: "LeitorId");

            migrationBuilder.CreateIndex(
                name: "IX_emprestimos_LivroId",
                table: "emprestimos",
                column: "LivroId");

            migrationBuilder.AddForeignKey(
                name: "FK_emprestimos_leitores_LeitorId",
                table: "emprestimos",
                column: "LeitorId",
                principalTable: "leitores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_emprestimos_livros_LivroId",
                table: "emprestimos",
                column: "LivroId",
                principalTable: "livros",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_emprestimos_leitores_LeitorId",
                table: "emprestimos");

            migrationBuilder.DropForeignKey(
                name: "FK_emprestimos_livros_LivroId",
                table: "emprestimos");

            migrationBuilder.DropIndex(
                name: "IX_emprestimos_LeitorId",
                table: "emprestimos");

            migrationBuilder.DropIndex(
                name: "IX_emprestimos_LivroId",
                table: "emprestimos");
        }
    }
}
