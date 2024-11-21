using Microsoft.EntityFrameworkCore;
using SisControlApi.Models;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Configura��o do CORS
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigins",
                builder =>
                {
                    builder.WithOrigins("{LocalHost}", "{Host Azure}")
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
        });

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Adiciona o MySQL ao servi�o
        /*builder.Services.AddDbContext<UserContext>(options =>
            options.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection")!));

        builder.Services.AddDbContext<ItemContext>(options =>
            options.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection")!));*/

        // Adiciona o SQL ao servi�o
        builder.Services.AddDbContext<UserContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")!));

        builder.Services.AddDbContext<ItemContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")!));


        var app = builder.Build();

        // Use a pol�tica de CORS com o nome configurado
        app.UseCors("AllowSpecificOrigins");

        //Permite que a requisi��o HTTP acesse qualquer CORS
        app.UseCors("AllowAllOrigins");

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}