using API.Models;
using API.Models.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Repository.Models;
using static Duende.IdentityServer.Models.IdentityResources;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;

    public UserController(UserManager<ApplicationUser> manager
        , IMapper mapper
        )
    {
        _userManager = manager;
        _mapper = mapper;
    }

    [HttpPost]
    public async Task<IActionResult> PostAsync([FromBody] CreditentialsDTO data)
    {
        var user = _mapper.Map<ApplicationUser>(data);

        var result = await _userManager.CreateAsync(user, data.Password);

        return Ok(result);
    }

    [HttpPost("confirmemail")]
    public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmationDTO data)
    {
        var user = await _userManager.FindByEmailAsync(data.Email);

        var result =  await _userManager.ConfirmEmailAsync(user, data.Token);

        //_userManager.ConfirmEmailAsync();
        return Ok(result);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteAsync([FromBody] string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user is null) return NotFound();

        var status = await _userManager.DeleteAsync(user);
        return Ok(status);
    }
}