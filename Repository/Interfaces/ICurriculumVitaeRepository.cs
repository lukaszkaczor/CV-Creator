using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repository.Models;

namespace Repository.Interfaces
{
    public interface ICurriculumVitaeRepository : IRepository<CurriculumVitae>
    {
        IEnumerable<CurriculumVitae> GetUserCvListWithDependencies(string userId);
        CurriculumVitae GetUsersCv(string userId, string cvId);
    }
}