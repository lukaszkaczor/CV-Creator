using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
public class CvAddressController : ControllerBase
{
    private readonly IUnitOfWork _context;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CvAddressController(IUnitOfWork context,
        IMapper mapper,
        IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var userId = CurrentUser.GetCurrentUser(_httpContextAccessor);

        var result = await _context.CvAddresses.GetUsersCvAddressesList(userId);

        // return Ok(result);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id)
    {
        var userId = CurrentUser.GetCurrentUser(_httpContextAccessor);

        var personalData = await _context.CvAddresses.GetUsersCvAddress(userId, id);
        var result = _mapper.Map<CvAddressDTO>(personalData);

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CvAddressDTO data)
    {
        var cvAddress = _mapper.Map<CvAddress>(data);
        var result = await _context.CvAddresses.AddAsync(cvAddress);
        await _context.Complete();

        var response = _mapper.Map<CvAddressDTO>(result);
        return Ok(response);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(Guid id, CvAddressDTO data)
    {
        var userId = CurrentUser.GetCurrentUser(_httpContextAccessor);

        var cvAddress = await _context.CvAddresses.GetUsersCvAddress(userId, id.ToString());
        var updatedData = _mapper.Map<CvAddress>(data);
        await _context.CvAddresses.Update(cvAddress.Id, updatedData);
        await _context.Complete();

        var result = _mapper.Map<CvAddressDTO>(cvAddress);
        return Ok(result);
    }
}