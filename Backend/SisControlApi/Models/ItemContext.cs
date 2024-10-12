using Microsoft.EntityFrameworkCore;

namespace SisControlApi.Models;

public class ItemContext : DbContext
{
    public ItemContext(DbContextOptions<ItemContext> options)
        : base(options)
    {
    }

    public DbSet<ItemPedido> ItemPedidos { get; set; } = null!;
    public DbSet<ItemPesquisa> ItemPesquisas { get; set; } = null!;
    public DbSet<ItemCadastro> ItemCadastros { get; set; } = null!;
}