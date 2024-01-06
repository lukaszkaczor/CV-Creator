using API.Models.DTOs;
using API.Utilities;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository.Interfaces;
using Repository.Models;

namespace API.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class PersonalDataController : ControllerBase
{
    private readonly IUnitOfWork _context;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public PersonalDataController(IUnitOfWork context,
    IMapper mapper,
    IHttpContextAccessor httpContextAccessor
    )
    {
        _context = context;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var userId = CurrentUser.GetCurrentUser(_httpContextAccessor);

        var result = await _context.PersonalData.GetUsersPersonalDataList(userId);

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id)
    {
        var userId = CurrentUser.GetCurrentUser(_httpContextAccessor);

        var personalData = await _context.PersonalData.GetUsersPersonalData(userId, id);
        var result = _mapper.Map<PersonalDataDTO>(personalData);

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] PersonalDataDTO data)
    {
        var personalData = _mapper.Map<PersonalData>(data);
        var result = await _context.PersonalData.AddAsync(personalData);
        await _context.Complete();

        var response = _mapper.Map<PersonalDataDTO>(result);
        return Ok(response);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(Guid id, PersonalDataDTO data)
    {
                            //    Task.Delay(3000).Wait();
        var userId = CurrentUser.GetCurrentUser(_httpContextAccessor);

        var personalData = await _context.PersonalData.GetUsersPersonalData(userId, id.ToString());
        var updatedData = _mapper.Map<PersonalData>(data);
        await _context.PersonalData.Update(personalData.Id, updatedData);
        await _context.Complete();

        var result = _mapper.Map<PersonalDataDTO>(personalData);
        return Ok(result);
    }
}