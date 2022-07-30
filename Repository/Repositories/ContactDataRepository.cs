using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using Repository.Models;

namespace Repository.Repositories;

public class ContactDataRepository : Repository<ContactData>, IContactDataRepository
{
    public ContactDataRepository(DbContext context) : base(context)
    {
    }

    public async Task<ContactData> GetUserContactData(string userId, string personalDataId)
    {
        return await Context.Set<ContactData>()
      .Where(d => d.CurriculumVitae.ApplicationUserId == userId)
      .FirstOrDefaultAsync(d => d.Id == Guid.Parse(personalDataId));
    }

    public async Task<IEnumerable<ContactData>> GetUserContactDataList(string userId)
    {
        return await Context.Set<ContactData>()
      .Where(d => d.CurriculumVitae.ApplicationUserId == userId)
      .ToListAsync();
    }
}