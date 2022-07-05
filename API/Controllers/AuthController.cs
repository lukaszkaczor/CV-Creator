using System.CodeDom.Compiler;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Models;
using API.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Repository.Models;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;


    public AuthController(IConfiguration config, UserManager<ApplicationUser> manager,
      SignInManager<ApplicationUser> signInManager)
    {
        _config = config;
        _userManager = manager;
        _signInManager = signInManager;
    }


    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] CreditentialsDTO creditentials)
    {
        var user = await _userManager.FindByEmailAsync(creditentials.Email);

        if (user is null) return NotFound();

        var result = await _signInManager.PasswordSignInAsync(creditentials.Email, creditentials.Password, true, false);

        if (result.Succeeded)
            return Ok(new { token = await GenerateTokenAsync(creditentials, user) });
        // return Ok(await GenerateTokenAsync(creditentials, user));

        return Unauthorized(result);
    }

    private async Task<string> GenerateTokenAsync(CreditentialsDTO creditentials, ApplicationUser user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var roles = await _userManager.GetRolesAsync(user);

        var claims = new List<Claim>()
        {
            new Claim(ClaimTypes.Name, user.Id)
        };

        foreach (var role in roles) claims.Add(new Claim(ClaimTypes.Role, role));

        var token = new JwtSecurityToken(
            _config["Jwt:Issuer"],
            _config["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddMinutes(50),
            signingCredentials: signingCredentials
            );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}