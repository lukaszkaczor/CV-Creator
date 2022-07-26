using Repository.Models;

namespace Repository.Interfaces;

public interface ICvAddressRepository : IRepository<CvAddress>
{
    Task<IEnumerable<CvAddress>> GetUsersCvAddressesList(string userId);
    Task<CvAddress> GetUsersCvAddress(string userId, string personalDataId);
}