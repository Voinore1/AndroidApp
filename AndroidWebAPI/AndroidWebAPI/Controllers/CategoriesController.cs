using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AndroidWebAPI.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class CategoriesController : Controller
{
    
}