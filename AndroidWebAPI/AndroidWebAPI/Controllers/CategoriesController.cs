using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AndroidWebAPI.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class CategoriesController(ICategoryService categoryService) : Controller
{
    [HttpGet]
    public async Task<IActionResult> GetList()
    {
        try
        {
            var userEmail = User.Claims.FirstOrDefault()?.Value ?? throw new Exception("userEmail undefined");

            return Ok(await categoryService.GetAll(userEmail));
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}