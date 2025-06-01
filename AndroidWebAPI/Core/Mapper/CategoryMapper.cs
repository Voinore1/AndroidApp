using AutoMapper;
using Core.Models.Category;
using Data.Entities;

namespace Core.Mapper;

public class CategoryMapper : Profile
{
    public CategoryMapper()
    {
        CreateMap<Category, CategoryInfoDto>();
    }
}