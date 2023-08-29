using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models;

namespace Repository.EntityConfiguration;


public class CvWorkExperienceTypeConfiguration : IEntityTypeConfiguration<CvWorkExperience>
{
    public void Configure(EntityTypeBuilder<CvWorkExperience> builder)
    {
        builder
        .Property(d => d.Name)
        .IsRequired()
        .HasMaxLength(64);
        
        
        builder
        .Property(d => d.CompanyName)
        .IsRequired()
        .HasMaxLength(64);


        builder
        .Property(d => d.City)
        .IsRequired()
        .HasMaxLength(32);

        builder
        .Property(d => d.StartDate)
        .IsRequired();
    }
}