
using API.Models;
using API.Models.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Repository.Models;

namespace API.Controllers;
[ApiController]
[Route("[controller]")]
public class CvPersonalDataController : Controller
{
    // private readonly CvCreatorDbContext _context;
    private readonly IMapper _mapper;
    public CvPersonalDataController(IMapper mapper)
    {
        _mapper = mapper;

    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok();
    }

    [HttpPost]
    public IActionResult Post([FromBody] PersonalDataDTO data)
    {
        var personalData2 = _mapper.Map<ApplicationUser>(data);
        // var result = await _context.AddAsync(personalData);
        // await _context.SaveChangesAsync();

        return Ok(new { personalData = personalData2 });
    }
}