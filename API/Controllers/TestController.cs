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
            var ss = new PdfGenerator();

            var content = """
            <div style="height: 1100px; width: 850px; border: 1px solid red; margin: 0; padding: 0; background: blue !important;"> 
            <h1>siema<h1>
            </div>
            
            <img src="https://i1.jbzd.com.pl/contents/2023/06/normal/3FTVV0oiIjEgMTDzPcpldvppGjoCzQUk.jpg" alt="">

            <style>
            html {
             -webkit-print-color-adjust: exact;
            }

            </style>

            """;
            // await ss.Launch();


            var result = await ss.Create(content);

            return File(result, "application/pdf", "FileDownloadName.pdf");
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CvBody data)
        {
            var generator = new PdfGenerator();

            var result = await generator.Create(data.body);

            return File(result, "application/pdf", "FileDownloadName.pdf");
            // using var browserFetcher = new BrowserFetcher();
            // await browserFetcher.DownloadAsync(BrowserFetcher.DefaultChromiumRevision);
            // var browser = await Puppeteer.LaunchAsync(new LaunchOptions { Headless = true });
            // var page = await browser.NewPageAsync();
            // // await page.SetViewportAsync(new ViewPortOptions
            // // {
            // //     Width = 850,
            // //     Height = 1100
            // // });

            // await page.SetContentAsync(data.body);

            // // await page.PdfAsync("test.pdf", new PdfOptions{
            // //     Format= PaperFormat.A4,
            // //     Height = 100,
            // //     Width = 50
            // // });
            // var wss = page.PdfStreamAsync(new PdfOptions { Height = "297mm", Width = "210mm" });

            // var dt = DateTime.Now;
            // var dss = DateOnly.FromDateTime(dt);

            // return File(wss.Result, "application/pdf", "FileDownloadName.pdf");
        }
    }
}
