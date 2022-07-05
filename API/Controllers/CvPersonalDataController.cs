
using API.Models;
using API.Models.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

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
    public async Task<IActionResult> Post([FromBody] CvPersonalDataDTO data)
    {
        // var personalData = _mapper.Map<CvPersonalData>(data);
        // var result = await _context.AddAsync(personalData);
        // await _context.SaveChangesAsync();

        return Ok(new { personalData = "result.Entity" });
    }
}