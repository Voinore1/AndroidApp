using Core.Models.Category;

namespace Core.Interfaces;

public interface ICategoryService
{
    Task<List<CategoryInfoDto>> GetAll(string email);
}