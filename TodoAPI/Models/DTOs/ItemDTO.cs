namespace TodoAPI.Models.DTOs
{
    public class ItemDTO
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Comment { get; set; }
        public DateTime Deadline { get; set; }
    }
}
