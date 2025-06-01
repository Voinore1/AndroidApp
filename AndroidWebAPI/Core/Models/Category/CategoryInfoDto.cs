namespace Core.Models.Category;

public class CategoryInfoDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Image { get; set; }
    public string? Description { get; set; }
    public int UserId { get; set; }
}