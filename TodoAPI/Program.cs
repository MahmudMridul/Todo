
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Serilog;
using TodoAPI.Db;
using TodoAPI.Repository;
using TodoAPI.Repository.IRepository;

namespace TodoAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            // Add repository
            builder.Services.AddScoped<IItemRepository, ItemRepository>();

            
            // Db context configuration
            builder.Services.AddDbContext<TodoContext>(
            op => op.UseSqlServer(builder.Configuration.GetConnectionString("Default"))
            );
            builder.Services.AddScoped<TodoContext>();
            

            //Add serilog
            builder.Host.UseSerilog((context, configuration) => 
                configuration.ReadFrom.Configuration(context.Configuration)
            );
            
            // Add CORS
            builder.Services.AddCors(ops => 
            {
                ops.AddPolicy("AllowAll", policy =>
                {
                    policy
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin();
                });
            });

            // Add controller options
            builder.Services.AddControllers(ops => 
            {
                ops.Filters.Add(new ProducesAttribute("application/json"));
            });
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            //Serilog configs
            app.UseSerilogRequestLogging();

            app.UseHttpsRedirection();

            app.UseCors("AllowAll");

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
