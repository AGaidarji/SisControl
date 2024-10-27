namespace SisControlApi.Models;
using System.ComponentModel.DataAnnotations;

public class UserCadastro
{
    [Key]
    public short IdUser { get; set; }

    public string Nome { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string? Telefone { get; set; }
    public string Congregacao { get; set; }
    public DateTime DateLogin { get; set; }

    public UserCadastro() { }

    public UserCadastro(DateTime dateLogin)
    {
        DateLogin = dateLogin;
    }
}
