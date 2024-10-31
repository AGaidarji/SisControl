using System.ComponentModel.DataAnnotations;

namespace SisControlApi.Models
{
    public class ItemPesquisa
    {
        [Key]
        public int IdItem { get; set; }
        public string NomeItem { get; set; }
        public int? Codigo { get; set; }
    }
}
