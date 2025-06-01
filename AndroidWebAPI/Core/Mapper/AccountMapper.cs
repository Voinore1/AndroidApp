using AutoMapper;
using Core.Models;
using Data.Entities;

namespace Core.Mapper;

public class AccountMapper : Profile
{
    public AccountMapper()
    {
        CreateMap<RegisterModel, User>().ForMember(x => x.UserName, opt => 
                                        opt.MapFrom(x => x.email));
        
        CreateMap<User, UserInfoDto>().ForMember(x => x.image, opt => 
                                        opt.MapFrom(x => x.ProfilePicturePath));
        
    }
}