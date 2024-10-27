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

    /*protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer("Server=DESKTOP-70UA9HO\\SQLEXPRESS;Database=SisControlDB;User Id=sa;Password=BSG1998@g;TrustServerCertificate=True;");
        }
    }*/

    public DbSet<UserCadastro> UserCadastro { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserCadastro>().ToTable("Usuarios");
    }
}
