using Microsoft.EntityFrameworkCore;
using TodoAPI.Models;

namespace TodoAPI.Db
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {
            
        }

        public DbSet<Item> Items { get; set; }
    }
}
