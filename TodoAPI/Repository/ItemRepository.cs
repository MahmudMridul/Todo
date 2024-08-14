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

        public Task<Item> CreateItem(Item item)
        {
            throw new NotImplementedException();
        }

        public Task<Item> DeleteItem(string title)
        {
            throw new NotImplementedException();
        }

        

        public Task<Item> GetItemById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Item> UpdateItem(Item item)
        {
            throw new NotImplementedException();
        }

        
    }
}
