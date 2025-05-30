using Core.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Channels;
using Data.Entities;

namespace Core.Services
{
    public class AuthService(UserManager<User> userManager, 
                                            JwtOptions jwtOptions) : IAuthService
    {
        public async Task<RegisterResult> RegisterAsync(RegisterModel model, IFileService fileService)
        {
            var user = new User { UserName = model.username, Email = model.email };
            
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
                new("id", user.Id.ToString()),
                new("email", user.Email!),
                new("username", user.UserName!),
                new("image", user.ProfilePicturePath!)
                
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtOptions.Issuer,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(jwtOptions.LifetimeInMinutes),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
