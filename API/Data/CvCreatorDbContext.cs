using API.Data.Configuration;
using API.Models;
using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Data
{
    public class CvCreatorDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<CurriculumVitae> CurriculumVitaes { get; set; }
        public DbSet<CvPersonalData> CvPersonalData { get; set; }
        public CvCreatorDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            new CvPersonalDataConfiguration().Configure(builder.Entity<CvPersonalData>());

        }
    }
}