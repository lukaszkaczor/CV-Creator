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

    public DatabaseContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ApplyConfiguration(new CurriculumVitaeTypeConfiguration());
    }


    // public static OptionsBuild Options = new OptionsBuild();

}