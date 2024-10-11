namespace SisControlApi.Models;
using System.ComponentModel.DataAnnotations;

public class UserCadastro
{
    [Key]
    public string Nome { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Telefone { get; set; }
    public string Congregacao { get; set; }
}
