using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository.Interfaces;
using Repository.Models;

namespace API.Controllers;

[Route("[controller]")]
public class CvController : ControllerBase
{
    public IUnitOfWork UnitOfWork { get; set; }
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CvController(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor)
    {
        UnitOfWork = unitOfWork;
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        var user = CurrentUser.GetCurrentUser(_httpContextAccessor);
        var cv = UnitOfWork.CurriculumVitaes.GetUserCvListWithDependencies(user);
        // var csv = CurrentUser.GetCurrentUserId(_httpContextAccessor);

        return Ok(cv);
    }


    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Post(string name)
    {
        if (String.IsNullOrWhiteSpace(name)) return BadRequest("Name can't be empty.");

        var userId = CurrentUser.GetCurrentUser(_httpContextAccessor);

        CurriculumVitae cv = new()
        {
            Name = name,
            CreationDate = DateTime.Now,
            ApplicationUserId = userId
        };

        await UnitOfWork.CurriculumVitaes.AddAsync(cv);
        await UnitOfWork.Complete();

        return Ok(cv);
    }

    [HttpDelete]
    [Authorize]
    public async Task<IActionResult> Delete(Guid id)
    {
        var userId = CurrentUser.GetCurrentUser(_httpContextAccessor);

        var cv = await UnitOfWork.CurriculumVitaes.GetAsync(id);
        if (cv is null || cv.ApplicationUserId != userId) return NotFound();

        UnitOfWork.CurriculumVitaes.Remove(cv);
        await UnitOfWork.Complete();


        return Ok(cv);
    }
}