using Core.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Channels;
using AutoMapper;
using Core.Mapper;
using Data.Entities;

namespace Core.Services
{
    public class AuthService(UserManager<User> userManager, 
                                            IMapper mapper) : IAuthService
    {
        public async Task<RegisterResult> RegisterAsync(RegisterModel model, IFileService fileService)
        {
            var user = mapper.Map<User>(model);
            
            if (model.image != null) { user.ProfilePicturePath = await fileService.SaveImage(model.image); }
            
            var result = await userManager.CreateAsync(user, model.password);
            if (result.Succeeded)
            {
                var token = GenerateJwtToken(user);
                return new RegisterResult { Succeeded = true, Token = token };
            }
            return new RegisterResult { Succeeded = false, Errors = result.Errors.Select(e => e.Description) };
        }

        public async Task<LoginResult> LoginAsync(LoginModel model)
        {
            var user = await userManager.FindByEmailAsync(model.email);
            if (user != null && await userManager.CheckPasswordAsync(user, model.password))
            {
                var token = GenerateJwtToken(user);
                return new LoginResult { Succeeded = true, Token = token };
            }
            return new LoginResult { Succeeded = false };
        }

        public async Task<User> GetUserInfoAsync(string userEmail)
        {
            var user = await userManager.FindByEmailAsync(userEmail)
                       ?? throw new Exception($"user by email {userEmail} not found");
            return user;
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new("email", user.Email!),
                new("id", user.Id.ToString()),
                new("username", user.UserName!),
                new("image", user.ProfilePicturePath!)
                
            };
            
            var key = Encoding.UTF8.GetBytes("uyfjydr5ee6vru6-ghiraekuyare-reaguhaekuyfgharh");
            var signingKey = new SymmetricSecurityKey(key);

            var signinCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(10),
                signingCredentials: signinCredentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
