using Microsoft.EntityFrameworkCore;
using TodoAPI.Db.IDb;
using TodoAPI.Models;

namespace TodoAPI.Db
{
    public class TodoContext : DbContext, IDbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {
            
        }

        public DbSet<Item> Items { get; set; }
    }
}
