using Microsoft.EntityFrameworkCore;


namespace SisControlApi.Models;

public class UserContext : DbContext
{
    public UserContext () { }
    public UserContext(DbContextOptions<UserContext> options)
        : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseMySQL("Server=localhost;Database=siscontrol;User=root;Password=Bomfim1998;");
        }
    }

    public DbSet<UserLogin> UserLogin { get; set; } = null!;
    public DbSet<UserCadastro> UserCadastro { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserCadastro>().ToTable("usuarios", schema: "siscontrol");
    }
}
