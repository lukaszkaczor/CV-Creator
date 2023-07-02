using API.Models.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository.Interfaces;
using Repository.Models;

namespace API.Controllers;

[ApiController]
// [Authorize(Roles = "Admin")]
[Route("[controller]")]
public class CvTemplateController : ControllerBase
{
    private readonly IUnitOfWork _context;
    private readonly IMapper _mapper;

    public CvTemplateController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _context = unitOfWork;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> Get() => Ok(await _context.Templates.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var result = await _context.Templates.GetAsync(id);

        if(result is null) return NotFound();

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CvTemplateDTO template)
    {
        var templateDTO = _mapper.Map<CvTemplate>(template);
        templateDTO.ModifyDate = DateTime.Now;

        var result  = await _context.Templates.AddAsync(templateDTO);
        await _context.Complete();

        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(Guid id, [FromBody] CvTemplateDTO data)
    {
        var template = await _context.Templates.GetAsync(id);

        if(template == null) return NotFound();

        var result = await _context.Templates.Update(id, _mapper.Map<CvTemplate>(data));
        result.ModifyDate = DateTime.Now;
        await _context.Complete();

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var template = await _context.Templates.GetAsync(id);

        if(template is null) return NotFound();

        _context.Templates.Remove(template);
        await _context.Complete();

        return NoContent();
    }
}
