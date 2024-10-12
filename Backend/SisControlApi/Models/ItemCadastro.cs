namespace SisControlApi.Models
{
    public class ItemCadastro
    {
        public string NomeItem { get; set; }
        public int Quantidade { get; set; }
        public string? Descricao { get; set; }
        public IFormFile? Imagem { get; set; }
    }
}
