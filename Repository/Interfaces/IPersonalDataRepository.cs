using System.Collections;
using Repository.Models;

namespace Repository.Interfaces;

public interface IPersonalDataRepository : IRepository<PersonalData>
{
    Task<IEnumerable<PersonalData>> GetUsersPersonalDataList(string userId);
    Task<PersonalData> GetUsersPersonalData(string userId, string personalDataId);
}