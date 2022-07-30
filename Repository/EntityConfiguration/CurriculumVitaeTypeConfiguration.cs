using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models;

namespace Repository.EntityConfiguration;

public class CurriculumVitaeTypeConfiguration : IEntityTypeConfiguration<CurriculumVitae>
{
    public void Configure(EntityTypeBuilder<CurriculumVitae> builder)
    {
        builder.Property(d => d.Name)
        .HasMaxLength(16);

        builder.Property(d => d.ApplicationUserId)
        .IsRequired();

        builder.Property(d => d.ModificationDate).IsRequired();

        builder
          .HasOne<PersonalData>(d => d.PersonalData)
          .WithOne(d => d.CurriculumVitae)
          .HasForeignKey<PersonalData>(d => d.CurriculumVitaeId);

        builder
          .HasOne<CvAddress>(d => d.CvAddress)
          .WithOne(d => d.CurriculumVitae)
          .HasForeignKey<CvAddress>(d => d.CurriculumVitaeId);

        builder
          .HasOne<ContactData>(d => d.ContactData)
          .WithOne(d => d.CurriculumVitae)
          .HasForeignKey<ContactData>(d => d.CurriculumVitaeId);
    }
}