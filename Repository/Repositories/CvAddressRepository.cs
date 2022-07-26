using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using Repository.Models;

namespace Repository.Repositories
{
    public class CvAddressRepository : Repository<CvAddress>, ICvAddressRepository
    {
        public CvAddressRepository(DbContext context) : base(context)
        {
        }

        public async Task<CvAddress> GetUsersCvAddress(string userId, string personalDataId)
        {
            return await Context.Set<CvAddress>()
           .Where(d => d.CurriculumVitae.ApplicationUserId == userId)
           .FirstOrDefaultAsync(d => d.Id == Guid.Parse(personalDataId));
        }

        public async Task<IEnumerable<CvAddress>> GetUsersCvAddressesList(string userId)
        {
            return await Context.Set<CvAddress>()
           .Where(d => d.CurriculumVitae.ApplicationUserId == userId)
           .ToListAsync();
        }
    }
}