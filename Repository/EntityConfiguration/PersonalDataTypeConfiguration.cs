using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models;

namespace Repository.EntityConfiguration;

public class PersonalDataTypeConfiguration : IEntityTypeConfiguration<PersonalData>
{
    public void Configure(EntityTypeBuilder<PersonalData> builder)
    {
        // builder
        // .HasOne>(d=>d.CurriculumVitae)
        // .HasOne<CurriculumVitae>(d => d.CurriculumVitae)
        // .WithOne(d => d.PersonalData)
        // .HasForeignKey<CurriculumVitae>(d => d.);

        builder.Property(d => d.FirstName)
        .IsRequired()
        .HasMaxLength(32);

        builder.Property(d => d.LastName)
        .IsRequired()
        .HasMaxLength(32);
    }
}