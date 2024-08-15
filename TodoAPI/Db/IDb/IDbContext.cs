using Microsoft.EntityFrameworkCore;
using TodoAPI.Models;

namespace TodoAPI.Db.IDb
{
    public interface IDbContext
    {
        DbSet<Item> Items { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }

}
