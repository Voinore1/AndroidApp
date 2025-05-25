using Core.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AndroidWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService, IFileService fileService) : ControllerBase
    {

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] RegisterModel model)
        {
            var result = await authService.RegisterAsync(model, fileService);
            if (result.Succeeded)
            {
                return Ok(new { Token = result.Token });
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var result = await authService.LoginAsync(model);
            if (result.Succeeded)
            {
                return Ok(new { Token = result.Token });
            }
            return Unauthorized();
        }
    }
}
