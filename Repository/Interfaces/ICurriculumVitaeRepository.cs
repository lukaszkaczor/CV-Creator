using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repository.Models;

namespace Repository.Interfaces
{
    public interface ICurriculumVitaeRepository : IRepository<CurriculumVitae>
    {
        Task<IEnumerable<CurriculumVitae>> GetUserCvListWithDependenciesAsync(string userId);
        Task<CurriculumVitae> GetUsersCvAsync(string userId, string cvId);
    }
}