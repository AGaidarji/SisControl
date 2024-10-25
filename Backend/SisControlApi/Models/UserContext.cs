using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;


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
            optionsBuilder.UseSqlServer("Server=localhost;Database=siscontrol;User=root;Password=Bomfim1998;");
        }
    }

    public DbSet<UserLogin> UserLogin { get; set; } = null!;
    public DbSet<UserCadastro> UserCadastro { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserCadastro>().ToTable("usuarios", schema: "siscontrol");
        modelBuilder.Entity<UserLogin>().ToTable("userlogin", schema: "siscontrol");
    }
}
