using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using Repository.Models;

namespace Repository.Repositories;

public class CurriculumVitaeRepository : Repository<CurriculumVitae>, ICurriculumVitaeRepository
{
    public CurriculumVitaeRepository(DbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<CurriculumVitae>> GetUserCvListWithDependenciesAsync(string userId)
    {
        return await Context.Set<CurriculumVitae>()
        // .Include(d => d.ApplicationUser)
        .Where(d => d.ApplicationUserId == userId)
        .ToListAsync();
    }

    public async Task<CurriculumVitae> GetUsersCvAsync(string userId, string cvId)
    {
        return await Context.Set<CurriculumVitae>()
        .Include(d => d.PersonalData)
        .Include(d => d.CvAddress)
        .Include(d => d.ContactData)
        .Include(d=>d.WorkExperience)
        .Include(d => d.Education)
        .Include(d=>d.Languages)
        .Where(d => d.ApplicationUserId == userId)
        .FirstOrDefaultAsync(d => d.Id == Guid.Parse(cvId));
    }
}