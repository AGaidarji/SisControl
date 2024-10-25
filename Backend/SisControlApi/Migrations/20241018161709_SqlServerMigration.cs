using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace SisControlApi.Migrations
{
    /// <inheritdoc />
    public partial class SqlServerMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_usuarios",
                schema: "siscontrol",
                table: "usuarios");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserLogin",
                table: "UserLogin");

            migrationBuilder.RenameTable(
                name: "UserLogin",
                newName: "userlogin",
                newSchema: "siscontrol");

            migrationBuilder.AlterColumn<string>(
                name: "Telefone",
                schema: "siscontrol",
                table: "usuarios",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext");

            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                schema: "siscontrol",
                table: "usuarios",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                schema: "siscontrol",
                table: "usuarios",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateLogin",
                schema: "siscontrol",
                table: "usuarios",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DateLogin",
                schema: "siscontrol",
                table: "userlogin",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_usuarios",
                schema: "siscontrol",
                table: "usuarios",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_userlogin",
                schema: "siscontrol",
                table: "userlogin",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_usuarios",
                schema: "siscontrol",
                table: "usuarios");

            migrationBuilder.DropPrimaryKey(
                name: "PK_userlogin",
                schema: "siscontrol",
                table: "userlogin");

            migrationBuilder.DropColumn(
                name: "Id",
                schema: "siscontrol",
                table: "usuarios");

            migrationBuilder.DropColumn(
                name: "DateLogin",
                schema: "siscontrol",
                table: "usuarios");

            migrationBuilder.DropColumn(
                name: "DateLogin",
                schema: "siscontrol",
                table: "userlogin");

            migrationBuilder.RenameTable(
                name: "userlogin",
                schema: "siscontrol",
                newName: "UserLogin");

            migrationBuilder.AlterColumn<string>(
                name: "Telefone",
                schema: "siscontrol",
                table: "usuarios",
                type: "longtext",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                schema: "siscontrol",
                table: "usuarios",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext");

            migrationBuilder.AddPrimaryKey(
                name: "PK_usuarios",
                schema: "siscontrol",
                table: "usuarios",
                column: "Nome");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserLogin",
                table: "UserLogin",
                column: "Id");
        }
    }
}
