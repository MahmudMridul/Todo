using Microsoft.EntityFrameworkCore;
using TodoAPI.Db;
using TodoAPI.Models;
using TodoAPI.Repository.IRepository;

namespace TodoAPI.Repository
{
    public class ItemRepository : IItemRepository
    {
        private readonly TodoContext _db;

        public ItemRepository(TodoContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Item>> GetAllItems()
        {
            return await _db.Items.AsNoTracking().ToListAsync();
        }

        public async Task<Item?> GetItemById(int id)
        {
            return await _db.Items.FirstOrDefaultAsync(obj => obj.Id == id);
        }

        public async Task<Item> CreateItem(Item item)
        {
            await _db.Items.AddAsync(item);
            await _db.SaveChangesAsync();
            return item;
        }


        public async Task<Item> UpdateItem(Item item)
        {
            _db.Items.Update(item);
            await _db.SaveChangesAsync();
            return item;
        }

        public async Task<Item?> GetItemByTitle(string title)
        {
            return await _db.Items.FirstOrDefaultAsync(obj => obj.Title == title);
        }

        public async Task<Item> DeleteItem(Item item)
        {
            _db.Items.Remove(item);
            await _db.SaveChangesAsync();
            return item;
        }        
    }
}
