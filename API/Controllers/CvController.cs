using API.Models.DTOs;
using API.Utilities;
using AutoMapper;
using Duende.IdentityServer.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository.Interfaces;
using Repository.Models;

namespace API.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class CvController : ControllerBase
{
    public IUnitOfWork UnitOfWork { get; set; }
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IMapper _mapper;

    public CvController(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor,
    IMapper mapper)
    {
        UnitOfWork = unitOfWork;
        _httpContextAccessor = httpContextAccessor;
        _mapper = mapper;
    }


    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id)
    {
        if (id.IsNullOrEmpty()) return BadRequest();

        var userId = CurrentUser.GetCurrentUser(_httpContextAccessor);
        var cv = await UnitOfWork.CurriculumVitaes.GetUsersCvAsync(userId, id);
        var result = _mapper.Map<CurriculumVitaeDTO>(cv);

        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var userId = CurrentUser.GetCurrentUser(_httpContextAccessor);

        var cvList = await UnitOfWork.CurriculumVitaes.GetUserCvListWithDependenciesAsync(userId);
        var result = new List<CurriculumVitaeDTO>();
        foreach (var item in cvList) result.Add(_mapper.Map<CurriculumVitaeDTO>(item));

        return Ok(result);
    }


    [HttpPost]
    public async Task<IActionResult> Post()
    {
        var userId = CurrentUser.GetCurrentUser(_httpContextAccessor);

        if (userId.IsNullOrEmpty()) return Unauthorized();

        CurriculumVitae cv = new()
        {
            Name = "Curriculum Vitae",
            ApplicationUserId = userId,
            ModificationDate = DateTime.Now
        };

        await UnitOfWork.CurriculumVitaes.AddAsync(cv);
        await UnitOfWork.Complete();

        return Ok(cv);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(string id, [FromBody] CurriculumVitaeDTO data)
    {
        var userId = CurrentUser.GetCurrentUser(_httpContextAccessor);

        var cv = await UnitOfWork.CurriculumVitaes.GetUsersCvAsync(userId, id);

        cv.Name = data.Name;
        cv.ModificationDate = DateTime.Now;

        await UnitOfWork.Complete();

        return Ok(cv);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var userId = CurrentUser.GetCurrentUser(_httpContextAccessor);

        var cv = await UnitOfWork.CurriculumVitaes.GetAsync(Guid.Parse(id));
        if (cv is null || cv.ApplicationUserId != userId) return NotFound();

        UnitOfWork.CurriculumVitaes.Remove(cv);
        await UnitOfWork.Complete();

        return NoContent();
    }
}