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
    }
}