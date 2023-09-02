namespace Repository.Interfaces;

public interface IUnitOfWork : IDisposable
{
    // ITestRepository Tests { get; }
    ICurriculumVitaeRepository CurriculumVitaes { get; }
    IPersonalDataRepository PersonalData { get; }
    ICvAddressRepository CvAddresses { get; }
    IContactDataRepository ContactData { get; }
    ICvTemplateRepository Templates { get; }
    ICvWorkExperienceRepository WorkExperience { get; }
    ICvEducationRepository Education{ get; }
    ILanguageRepository Languages { get; }

    Task<int> Complete();
    // void Update<T>(T entry, T values) where T : IIdentificator;
}