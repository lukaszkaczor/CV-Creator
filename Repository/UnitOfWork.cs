using Repository.DataContext;
using Repository.Interfaces;
using Repository.Repositories;

namespace Repository;

public class UnitOfWork : IUnitOfWork
{
    private readonly DatabaseContext _context;
    public ITestRepository Tests { get; private set; }

    public UnitOfWork(DatabaseContext context)
    {
        _context = context;
        Tests = new TestRepository(_context);
    }

    public int Complete()
    {
        return _context.SaveChanges();
    }

    public void Dispose()
    {
        _context.Dispose();
        GC.SuppressFinalize(this);
    }
}