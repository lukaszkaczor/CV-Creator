using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Utilities;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        // private readonly IUnitOfWork _context;
        // private readonly UserManager<ApplicationUser> _userManager;
        // private readonly IHttpContextAccessor _httpContextAccessor;

        public TestController(
        // IUnitOfWork context, UserManager<ApplicationUser> userManager,
        // IHttpContextAccessor httpContextAccessor
        )
        {
            // _context = context;
            // this._userManager = userManager;
            // _httpContextAccessor = httpContextAccessor;

        }


        // [HttpGet("Admins")]
        // [Authorize(Roles = "Admin")]
        // public IActionResult AdminsEndpoint()
        // {
        //     return Ok("admins works");
        // }


        [HttpGet("Public")]
        // [Authorize]
        public IActionResult GetPublicDataAsync()
        {
            // var accessToken = Request.Headers[HeaderNames.Authorization];

            // var user = _httpContextAccessor.HttpContext.User.Identity.Name;
            // var user = CurrentUser.GetCurrentUser(_httpContextAccessor);
            var dt = DateTime.Now;
            var dss = DateOnly.FromDateTime(dt);

            // var ssd  =HttpContent.Current

            return Ok(dss);
        }
    }
}