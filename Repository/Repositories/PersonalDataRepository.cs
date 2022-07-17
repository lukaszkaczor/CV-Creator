using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using Repository.Models;

namespace Repository.Repositories;

public class PersonalDataRepository : Repository<PersonalData>, IPersonalDataRepository
{
    public PersonalDataRepository(DbContext context) : base(context)
    {
    }

    public async Task<PersonalData> GetUsersPersonalData(string userId, string personalDataId)
    {
        return await Context.Set<PersonalData>()
            .Where(d => d.CurriculumVitae.ApplicationUserId == userId)
            .FirstOrDefaultAsync(d => d.Id == Guid.Parse(personalDataId));
    }

    public async Task<IEnumerable<PersonalData>> GetUsersPersonalDataList(string userId)
    {
        return await Context.Set<PersonalData>()
            .Where(d => d.CurriculumVitae.ApplicationUserId == userId)
            .ToListAsync();
    }
}