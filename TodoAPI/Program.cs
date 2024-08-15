
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoAPI.Db;
using TodoAPI.Db.IDb;
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

            // Add db context
            bool useInMemoryDb = builder.Configuration.GetValue<bool>("UseInMemoryDb");

            if (useInMemoryDb)
            {
                builder.Services.AddDbContext<InMemoryContext>(
                    options => options.UseInMemoryDatabase("InMemoryDb")
                );
                builder.Services.AddScoped<IDbContext, InMemoryContext>();
            }
            else
            {
                builder.Services.AddDbContext<TodoContext>(
                op => op.UseSqlServer(builder.Configuration.GetConnectionString("Default"))
                );
                builder.Services.AddScoped<IDbContext, TodoContext>();
            }
            
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

            app.UseHttpsRedirection();

            app.UseCors("AllowAll");

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
