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

        public Task<Item> DeleteItem(string title)
        {
            throw new NotImplementedException();
        }

        




        
    }
}
