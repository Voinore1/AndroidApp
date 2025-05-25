using Microsoft.AspNetCore.Identity;

namespace Data.Entities;

public class User : IdentityUser<int>
{
    public string? ProfilePicturePath { get; set; }
}