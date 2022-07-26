using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models;

namespace Repository.EntityConfiguration;

public class CvAddressTypeConfiguration : IEntityTypeConfiguration<CvAddress>
{
    public void Configure(EntityTypeBuilder<CvAddress> builder)
    {
        builder
        .Property(d => d.Town)
        .IsRequired()
        .HasMaxLength(32);

        builder
        .Property(d => d.ZipCode)
        .IsRequired()
        .HasMaxLength(10);

        builder
        .Property(d => d.Address)
        .HasMaxLength(64);

        builder
        .Property(d => d.HouseNumber)
        .IsRequired()
        .HasMaxLength(16);
    }
}