using Core.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Channels;

namespace Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly JwtOptions jwtOptions;

        public AuthService(UserManager<IdentityUser> userManager, JwtOptions jwtOptions)
        {
            this.userManager = userManager;
            this.jwtOptions = jwtOptions;
        }

        public async Task<RegisterResult> RegisterAsync(RegisterModel model)
        {
            var user = new IdentityUser { UserName = model.Username, Email = model.Email };
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

        private string GenerateJwtToken(IdentityUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
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
