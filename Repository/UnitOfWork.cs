using Microsoft.Net.Http.Headers;
using Repository.DataContext;
using Repository.Interfaces;
using Repository.Repositories;

namespace Repository;

public class UnitOfWork : IUnitOfWork
{
    private readonly DatabaseContext _context;
    public ICurriculumVitaeRepository CurriculumVitaes { get; private set; }
    public IPersonalDataRepository PersonalData { get; private set; }
    public ICvAddressRepository CvAddresses { get; private set; }
    public IContactDataRepository ContactData { get; private set; }

    public UnitOfWork(DatabaseContext context)
    {
        _context = context;
        CurriculumVitaes = new CurriculumVitaeRepository(_context);
        PersonalData = new PersonalDataRepository(_context);
        CvAddresses = new CvAddressRepository(_context);
        ContactData = new ContactDataRepository(_context);
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