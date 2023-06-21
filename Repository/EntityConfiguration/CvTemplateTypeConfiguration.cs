using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.EntityConfiguration
{
    public class CvTemplateTypeConfiguration : IEntityTypeConfiguration<CvTemplate>
    {
        public void Configure(EntityTypeBuilder<CvTemplate> builder)
        {
            builder.Property(d => d.Name).IsRequired().HasMaxLength(16);

            builder.Property(d => d.HtmlContent).IsRequired();
            builder.Property(d => d.Styles).IsRequired();
        }
    }
}
