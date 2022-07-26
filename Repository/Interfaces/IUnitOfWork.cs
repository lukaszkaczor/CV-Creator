namespace Repository.Interfaces;

public interface IUnitOfWork : IDisposable
{
    // ITestRepository Tests { get; }
    ICurriculumVitaeRepository CurriculumVitaes { get; }
    IPersonalDataRepository PersonalData { get; }
    ICvAddressRepository CvAddresses { get; }
    Task<int> Complete();
}