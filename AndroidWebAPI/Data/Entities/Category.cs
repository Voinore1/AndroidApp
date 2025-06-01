using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities;

[Table("tblCategories")]
public class Category
{
    [Key]
    public int Id { get; set; }

    [StringLength(255)] public string Name { get; set; } = string.Empty;

    [StringLength(100)]
    public string? Image { get; set; }

    [StringLength(4000)]
    public string? Description { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }
    public virtual User? User { get; set; }
}