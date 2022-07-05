using Repository.DataContext;
using Repository.Interfaces;
using Repository.Models;

namespace Repository.Repositories;

public class TestRepository : Repository<Test>, ITestRepository
{
    public TestRepository(DatabaseContext context) : base(context)
    {
    }

    public IEnumerable<Test> GetAllTests()
    {
        return DatabaseContext.Tests.ToList();
    }

    public DatabaseContext DatabaseContext
    {
        get { return Context as DatabaseContext; }
    }
}