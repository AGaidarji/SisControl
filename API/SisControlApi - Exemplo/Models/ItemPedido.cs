using System.ComponentModel.DataAnnotations;

namespace SisControlApi.Models
{
    public class ItemPedido
    {
        [Key]
        public int IdPedido { get; set; }
        public string NomeItem { get; set; }
        public int Quantidade { get; set; }
        public string Evento { get; set; }
        public DateTime DataEvento { get; set; }
    }
}
