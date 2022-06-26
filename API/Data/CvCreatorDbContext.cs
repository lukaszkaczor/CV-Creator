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
        public DbSet<UserLogin> Test { get; set; }
        public CvCreatorDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            new CvPersonalDataConfiguration().Configure(builder.Entity<CvPersonalData>());

            builder.Entity<UserLogin>().Property(d => d.Password).IsRequired();
            builder.Entity<UserLogin>().Property(d => d.Login).HasMaxLength(5);



            // builder.Entity<CvPersonalData>()
            // .HasOne<CurriculumVitae>(d => d.CurriculumVitae)
            // .WithOne(d => d.PersonalData)
            // .HasForeignKey<CurriculumVitae>(d => d.PersonalDataId);

            // builder.Entity<CurriculumVitae>()
            // .HasOne<CvPersonalData>(d => d.PersonalData)
            // .WithOne(d => d.CurriculumVitae)
            // .HasForeignKey<CvPersonalData>(d => d.CurriculumVitae);


        }
    }
}