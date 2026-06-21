using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class Updates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_historico_leitores_LeitorId",
                table: "historico");

            migrationBuilder.DropForeignKey(
                name: "FK_historico_livros_LivroId",
                table: "historico");

            migrationBuilder.DropPrimaryKey(
                name: "PK_historico",
                table: "historico");

            migrationBuilder.RenameTable(
                name: "historico",
                newName: "historicos");

            migrationBuilder.RenameIndex(
                name: "IX_historico_LivroId",
                table: "historicos",
                newName: "IX_historicos_LivroId");

            migrationBuilder.RenameIndex(
                name: "IX_historico_LeitorId",
                table: "historicos",
                newName: "IX_historicos_LeitorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_historicos",
                table: "historicos",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_historicos_leitores_LeitorId",
                table: "historicos",
                column: "LeitorId",
                principalTable: "leitores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_historicos_livros_LivroId",
                table: "historicos",
                column: "LivroId",
                principalTable: "livros",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_historicos_leitores_LeitorId",
                table: "historicos");

            migrationBuilder.DropForeignKey(
                name: "FK_historicos_livros_LivroId",
                table: "historicos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_historicos",
                table: "historicos");

            migrationBuilder.RenameTable(
                name: "historicos",
                newName: "historico");

            migrationBuilder.RenameIndex(
                name: "IX_historicos_LivroId",
                table: "historico",
                newName: "IX_historico_LivroId");

            migrationBuilder.RenameIndex(
                name: "IX_historicos_LeitorId",
                table: "historico",
                newName: "IX_historico_LeitorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_historico",
                table: "historico",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_historico_leitores_LeitorId",
                table: "historico",
                column: "LeitorId",
                principalTable: "leitores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_historico_livros_LivroId",
                table: "historico",
                column: "LivroId",
                principalTable: "livros",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
