using Repository.DataContext;
using Repository.Interfaces;
using Repository.Repositories;

namespace Repository;

public class UnitOfWork : IUnitOfWork
{
    private readonly DatabaseContext _context;
    public ICurriculumVitaeRepository CurriculumVitaes { get; private set; }

    public UnitOfWork(DatabaseContext context)
    {
        _context = context;
        CurriculumVitaes = new CurriculumVitaeRepository(_context);
    }

    public async Task<int> Complete()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
        GC.SuppressFinalize(this);
    }
}