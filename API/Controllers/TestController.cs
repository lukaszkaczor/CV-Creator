
using Repository.DataContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Repository.Interfaces;
using Repository.Models;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.Net.Http.Headers;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        private readonly IUnitOfWork _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TestController(IUnitOfWork context, UserManager<ApplicationUser> userManager,
        IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            this._userManager = userManager;
            _httpContextAccessor = httpContextAccessor;

        }


        // [HttpGet("Admins")]
        // [Authorize(Roles = "Admin")]
        // public IActionResult AdminsEndpoint()
        // {
        //     return Ok("admins works");
        // }


        [HttpGet("Public")]
        [Authorize]
        public async Task<IActionResult> GetPublicDataAsync()
        {
            var accessToken = Request.Headers[HeaderNames.Authorization];

            var user = _httpContextAccessor.HttpContext.User.Identity.Name;

            return Ok(new { test = user });
        }
    }
}