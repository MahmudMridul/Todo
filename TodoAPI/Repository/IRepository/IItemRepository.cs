using TodoAPI.Models;

namespace TodoAPI.Repository.IRepository
{
    public interface IItemRepository
    {
        Task<IEnumerable<Item>> GetAllItems();
        Task<Item?> GetItemById(int id);
        Task<Item> CreateItem(Item item);
        Task<Item> UpdateItem(Item item);
        Task<Item> DeleteItem(string title);

    }
}
