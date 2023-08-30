using Repository.Models;
using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Repository.EntityConfiguration;

namespace Repository.DataContext;

public class DatabaseContext : ApiAuthorizationDbContext<ApplicationUser>
{
    public DbSet<CurriculumVitae> CurriculumVitaes { get; set; }
    public DbSet<PersonalData> PersonalData { get; set; }
    public DbSet<CvAddress> CvAddresses { get; set; }
    public DbSet<ContactData> ContactData { get; set; }
    public DbSet<CvTemplate> Templates { get; set; }
    public DbSet<CvWorkExperience> WorkExperience { get; set; }
    public DbSet<CvEducation> Education { get; set; }

    public DatabaseContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ApplyConfiguration(new CurriculumVitaeTypeConfiguration());
        builder.ApplyConfiguration(new PersonalDataTypeConfiguration());
        builder.ApplyConfiguration(new CvAddressTypeConfiguration());
        builder.ApplyConfiguration(new ContactDataTypeConfiguration());
        builder.ApplyConfiguration(new CvWorkExperienceTypeConfiguration());
        builder.ApplyConfiguration(new CvEducationTypeConfiguration());
    }

    // public static OptionsBuild Options = new OptionsBuild();

}