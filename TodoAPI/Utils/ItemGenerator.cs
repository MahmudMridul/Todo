using TodoAPI.Models;

namespace TodoAPI.Utils
{
    public class ItemGenerator
    {
        private static readonly Random _random = new Random();

        public static List<Item> GenerateRandomItems(int count = 10)
        {
            var items = new List<Item>();
            for (int i = 0; i < count; i++)
            {
                items.Add(new Item
                {
                    Id = i + 1, // Sequential ID for simplicity
                    Title = GenerateRandomTitle(),
                    Description = GenerateRandomNullableString(),
                    Comment = GenerateRandomNullableString(),
                    CreatedDate = DateTime.Now.AddDays(_random.Next(1, 30)), // Random date in the past 30 days
                    UpdatedDate = DateTime.Now.AddDays(_random.Next(0, 7)), // Random date in the past 7 days
                    Deadline = DateTime.Now.AddDays(_random.Next(0, 7)), // Current time + 2 days
                    IsCompleted = _random.Next(0, 2) == 1 // Random boolean value
                });
            }
            return items;
        }

        private static string GenerateRandomTitle()
        {
            var titles = new[] { "Task A", "Task B", "Task C", "Task D", "Task E" };
            return titles[_random.Next(titles.Length)];
        }

        private static string? GenerateRandomNullableString()
        {
            return _random.Next(0, 2) == 1 ? null : $"Sample text {_random.Next(1, 100)}";
        }
    }

}

