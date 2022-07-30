using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repository.Models;

namespace Repository.Interfaces
{
    public interface IContactDataRepository : IRepository<ContactData>
    {
        Task<IEnumerable<ContactData>> GetUserContactDataList(string userId);
        Task<ContactData> GetUserContactData(string userId, string personalDataId);
    }
}