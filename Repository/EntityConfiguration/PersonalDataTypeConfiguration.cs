using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models;

namespace Repository.EntityConfiguration;

public class PersonalDataTypeConfiguration : IEntityTypeConfiguration<PersonalData>
{
    public void Configure(EntityTypeBuilder<PersonalData> builder)
    {
        builder.Property(d => d.FirstName)
        .IsRequired()
        .HasMaxLength(32);

        builder.Property(d => d.LastName)
        .IsRequired()
        .HasMaxLength(32);

        builder.Property(d => d.DateOfBirth)
        .IsRequired();
    }
}