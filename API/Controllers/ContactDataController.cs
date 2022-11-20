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
public class ContactDataController : ControllerBase
{
    private readonly IUnitOfWork _context;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ContactDataController(IUnitOfWork context,
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

        var result = await _context.ContactData.GetUserContactDataList(userId);

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id)
    {
        var userId = CurrentUser.GetCurrentUser(_httpContextAccessor);

        var contactData = await _context.ContactData.GetUserContactData(userId, id);
        var result = _mapper.Map<ContactData>(contactData);

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] ContactDataDTO data)
    {
        var contactData = _mapper.Map<ContactData>(data);
        var result = await _context.ContactData.AddAsync(contactData);
        await _context.Complete();

        var response = _mapper.Map<ContactDataDTO>(result);
        return Ok(response);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(Guid id, ContactDataDTO data)
    {
        var userId = CurrentUser.GetCurrentUser(_httpContextAccessor);

        var contactData = await _context.ContactData.GetUserContactData(userId, id.ToString());
        var updatedData = _mapper.Map<ContactData>(data);
        _context.ContactData.Update(contactData.Id, updatedData);
        await _context.Complete();

        var result = _mapper.Map<ContactDataDTO>(contactData);
        return Ok(result);
    }
}