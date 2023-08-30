using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models;

namespace Repository.EntityConfiguration;


public class CvEducationTypeConfiguration : IEntityTypeConfiguration<CvEducation>
{
    public void Configure(EntityTypeBuilder<CvEducation> builder)
    {
        builder
        .Property(d => d.Degree)
        .IsRequired()
        .HasMaxLength(64);
        
        
        builder
        .Property(d => d.SchoolName)
        .IsRequired()
        .HasMaxLength(64);

        builder
        .Property(d => d.StartDate)
        .IsRequired();
    }
}