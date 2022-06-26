
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[ApiController]
[Route("[controller]")]
public class CvPersonalDataController : Controller
{
    private readonly CvCreatorDbContext _context;
    // private readonly xIMapper _mapper;
    public CvPersonalDataController(CvCreatorDbContext context)
    {
        this._context = context;
        // _mapper = mapper;

    }
    // private readonly ILogger<CvPersonalData> _logger;

    // public CvPersonalDataController()
    // {
    //     // _logger = logger;
    // }

    [HttpGet]
    public IActionResult Get()
    {
        var result = _context.Test.ToList();
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] UserLoginDTO data)
    {
        // var mappedData = _mapper.Map<UserLogin>(data);
        // var first = await _context.Test.AddAsync(mappedData);
        // if (!ModelState.IsValid) return NotFound();

        // var ssd = await _context.Test.AddAsync(data);
        // await _context.SaveChangesAsync();
        // var ctx = _context.CvPersonalData.Add(new CvPersonalData()
        // {
        //     FirstName = "Jeden",
        //     CurriculumVitaeId = 1
        // });


        // var dd = _context.SaveChanges();
        // var ss = _mapper.Map<UserLoginDTO>(first.Entity);

        return Ok();
    }
}