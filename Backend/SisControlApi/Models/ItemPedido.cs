namespace SisControlApi.Models
{
    public class ItemPedido
    {
        public string NomeItem { get; set; }
        public int Quantidade { get; set; }
        public string Evento { get; set; }
        public DateTime DataEvento { get; set; }
    }
}
