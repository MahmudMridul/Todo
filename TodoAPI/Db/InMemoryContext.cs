using Microsoft.EntityFrameworkCore;
using TodoAPI.Db.IDb;
using TodoAPI.Models;

namespace TodoAPI.Db
{
    public class InMemoryContext : DbContext, IDbContext
    {
        public InMemoryContext(DbContextOptions<InMemoryContext> options) : base(options)
        {
            
        }
        public DbSet<Item> Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Item>().HasData(
                new Item() 
                { 
                    Id = 1,
                    Title = "Task One", 
                    CreatedDate = DateTime.Now, 
                    UpdatedDate = DateTime.Now, 
                    Deadline = DateTime.Now.AddDays(7),
                    IsCompleted = false,
                },
                new Item()
                {
                    Id = 2,
                    Title = "Task Two",
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now,
                    Deadline = DateTime.Now.AddDays(7),
                    IsCompleted = false,
                },
                new Item()
                {
                    Id = 3,
                    Title = "Task Three",
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now,
                    Deadline = DateTime.Now.AddDays(7),
                    IsCompleted = false,
                },
                new Item()
                {
                    Id = 4,
                    Title = "Task Four",
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now,
                    Deadline = DateTime.Now.AddDays(7),
                    IsCompleted = false,
                },
                new Item()
                {
                    Id = 5,
                    Title = "Task Five",
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now,
                    Deadline = DateTime.Now.AddDays(7),
                    IsCompleted = false,
                }
            );
            base.OnModelCreating(modelBuilder);
        }
    }
}
