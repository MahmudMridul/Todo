using System.ComponentModel.DataAnnotations;

namespace TodoAPI.Models
{
    public class Item
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedDate { get; set;}
        public DateTime UpdatedDate { get; set;}
        public DateTime Deadline { get; set;}
        public bool IsCompleted { get; set;}
    }
}
