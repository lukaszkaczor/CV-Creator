using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models;

namespace Repository.EntityConfiguration;

public class LanguageTypeConfiguration : IEntityTypeConfiguration<Language>
{
    public void Configure(EntityTypeBuilder<Language> builder)
    {
        builder
        .Property(d => d.LanguageName)
        .IsRequired()
        .HasMaxLength(32);

        builder
        .Property(d => d.Level)
        .IsRequired()
        .HasMaxLength(32);
    }
}