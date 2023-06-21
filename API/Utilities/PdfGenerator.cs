using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PuppeteerSharp;

namespace API.Utilities;

public class PdfGenerator
{
    public async Task<Stream> Create(string content)
    {
        using var browserFetcher = new BrowserFetcher();
        await browserFetcher.DownloadAsync(BrowserFetcher.DefaultChromiumRevision);
        var browser = await Puppeteer.LaunchAsync(new LaunchOptions { Headless = true });
        var page = await browser.NewPageAsync();

        await page.SetContentAsync(content);
        var stream = page.PdfStreamAsync(new PdfOptions { Height = "297mm", Width = "210mm" });

        return stream.Result;
    }
}
