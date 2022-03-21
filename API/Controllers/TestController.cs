using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        private CvCreatorDbContext _context;
        public TestController(CvCreatorDbContext context)
        {
            _context = context;
        }


        [HttpGet("Admins")]
        [Authorize(Roles = "Admin")]
        public IActionResult AdminsEndpoint()
        {
            return Ok("admins works");
        }


        [HttpGet("Public")]
        public IActionResult GetPublicData()
        {
            var ss = _context.Roles.ToList();

            return Ok(ss);
        }
    }
}