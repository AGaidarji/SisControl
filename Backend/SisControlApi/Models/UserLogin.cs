namespace SisControlApi.Models
{
    public class UserLogin
    {
        public int? Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime DateLogin { get; set; }
    }
}
