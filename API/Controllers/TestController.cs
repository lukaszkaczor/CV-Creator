using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Utilities;
using Repository.Interfaces;
using PuppeteerSharp;
using API.Models;
using PuppeteerSharp.Media;

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
        // IUnitOfWork context
        // UserManager<ApplicationUser> userManager,
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

        // [HttpPost]
        // public IActionResult Post()
        // {

        //     var ss = _context.Tests.AddAsync(new Repository.Models.Test() { Name = "test" });
        //     _context.Complete();

        //     return Ok(ss);
        // }

        [HttpGet("Public")]
        // [Authorize]
        public async Task<IActionResult> GetPublicDataAsync()
        {


            using var browserFetcher = new BrowserFetcher();
            await browserFetcher.DownloadAsync(BrowserFetcher.DefaultChromiumRevision);
            var browser = await Puppeteer.LaunchAsync(new LaunchOptions
            {
                Headless = true
            });
            var page = await browser.NewPageAsync();
            await page.SetContentAsync("""
            <div style="height: 1100px; width: 850px; border: 1px solid red; margin: 0; padding: 0;"> 
            <h1>siema<h1>
            </div>
            """);

            
            await page.PdfAsync("test.pdf");
            var wss = page.PdfStreamAsync();

           
          


            // var accessToken = Request.Headers[HeaderNames.Authorization];

            // var user = _httpContextAccessor.HttpContext.User.Identity.Name;
            // var user = CurrentUser.GetCurrentUser(_httpContextAccessor);
            var dt = DateTime.Now;
            var dss = DateOnly.FromDateTime(dt);

            // var ssd  =HttpContent.Current

            // return Ok(wss.Result);
            return File(wss.Result, "application/pdf", "FileDownloadName.pdf");
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CvBody data)
        {
             using var browserFetcher = new BrowserFetcher();
            await browserFetcher.DownloadAsync(BrowserFetcher.DefaultChromiumRevision);
            var browser = await Puppeteer.LaunchAsync(new LaunchOptions
            {
                Headless = true
            });
            var page = await browser.NewPageAsync();
// await page.SetViewportAsync(new ViewPortOptions
// {
//     Width = 850,
//     Height = 1100
// });

            await page.SetContentAsync(data.body);



            
            // await page.PdfAsync("test.pdf", new PdfOptions{
            //     Format= PaperFormat.A4,
            //     Height = 100,
            //     Width = 50
            // });
            var wss = page.PdfStreamAsync( new PdfOptions{

                Height = "297mm",
                Width = "210mm"
        });

                       var dt = DateTime.Now;
            var dss = DateOnly.FromDateTime(dt);

            return File(wss.Result, "application/pdf", "FileDownloadName.pdf");
        }


    }
}