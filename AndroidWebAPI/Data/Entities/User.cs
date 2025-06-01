using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Data.Entities;

public class User : IdentityUser<int>
{
    [StringLength(100)]
    public string? ProfilePicturePath { get; set; }

    public virtual ICollection<Category> Categories { get; set; }
}