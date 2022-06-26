using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configuration
{
    public class CvPersonalDataConfiguration : IEntityTypeConfiguration<CvPersonalData>
    {
        public void Configure(EntityTypeBuilder<CvPersonalData> builder)
        {

            builder.Property(d => d.FirstName)
            .IsRequired();

            builder.Property(d => d.LastName)
            .IsRequired();

            builder
                .HasOne<CurriculumVitae>(d => d.CurriculumVitae)
                .WithOne(d => d.PersonalData)
                .HasForeignKey<CurriculumVitae>(d => d.PersonalDataId);


            // builder.Property(d => d.CvIdentificator)
            // .IsRequired();

            // builder.Entity<>
        }
    }
}