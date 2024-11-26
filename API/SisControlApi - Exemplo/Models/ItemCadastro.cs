using System.ComponentModel.DataAnnotations;

namespace SisControlApi.Models
{
    public class ItemCadastro
    {
        [Key]
        public int IdItem { get; set; }
        public string NomeItem { get; set; }
        public int Quantidade { get; set; }
        public string? Descricao { get; set; }
        public byte[]? ImagemItem { get; set; }
    }
}
