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
            var user = new User { UserName = model.Username, Email = model.Email };
            
            if (model.ProfilePicture != null) { user.ProfilePicturePath = await fileService.SaveImage(model.ProfilePicture); }
            
            var result = await userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                var token = GenerateJwtToken(user);
                return new RegisterResult { Succeeded = true, Token = token };
            }
            return new RegisterResult { Succeeded = false, Errors = result.Errors.Select(e => e.Description) };
        }

        public async Task<LoginResult> LoginAsync(LoginModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var token = GenerateJwtToken(user);
                return new LoginResult { Succeeded = true, Token = token };
            }
            return new LoginResult { Succeeded = false };
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email!)
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
