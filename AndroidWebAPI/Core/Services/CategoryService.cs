using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces;
using Core.Models.Category;
using Data;
using Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace Core.Services;

public class CategoryService(UserManager<User> userManager, 
                             AppDbContext context,
                             IMapper mapper) : ICategoryService
{
    public async Task<List<CategoryInfoDto>> GetAll(string email)
    {
        var user = await userManager.FindByEmailAsync(email) ??
                   throw new Exception($"user by email {email} not found.");

        var categoriesList = context.Categories.Where(x => x.UserId == user.Id)
            .ProjectTo<CategoryInfoDto>(mapper.ConfigurationProvider).ToList();

        return categoriesList;
    }
    
}