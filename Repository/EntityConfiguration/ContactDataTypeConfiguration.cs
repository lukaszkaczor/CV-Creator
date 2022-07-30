using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models;

namespace Repository.EntityConfiguration;

public class ContactDataTypeConfiguration : IEntityTypeConfiguration<ContactData>
{
    public void Configure(EntityTypeBuilder<ContactData> builder)
    {
        builder.Property(d => d.Email)
        .IsRequired()
        .HasMaxLength(50);

        builder.Property(d => d.PhoneNumber)
        .IsRequired()
        .HasMaxLength(16);

        builder.Property(d => d.CurriculumVitaeId)
        .IsRequired();
    }
}