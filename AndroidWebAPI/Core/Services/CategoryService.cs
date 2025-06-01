using Core.Interfaces;
using Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace Core.Services;

public class CategoryService(UserManager<User> userManager) : ICategoryService
{
    
}