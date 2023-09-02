using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using Repository.Repositories;

namespace Repository.Repositories;


public class LanguageRepository : Repository<Language>, ILanguageRepository
{
    public LanguageRepository(DbContext context) : base(context)
    {
    }
}