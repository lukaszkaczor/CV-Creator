using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using Repository.Models;

namespace Repository.Repositories
{
    public class CurriculumVitaeRepository : Repository<CurriculumVitae>, ICurriculumVitaeRepository
    {
        public CurriculumVitaeRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<CurriculumVitae> GetUserCvListWithDependencies(string userId)
        {
            return Context.Set<CurriculumVitae>()
            // .Include(d => d.ApplicationUser)
            .Where(d => d.ApplicationUserId == userId)
            .ToList();
        }

        // public override CurriculumVitae Get(Guid id)
        // {
        //     return new CurriculumVitae();
        // }
    }
}