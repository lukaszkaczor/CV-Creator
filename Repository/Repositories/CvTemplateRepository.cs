using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    internal class CvTemplateRepository : Repository<CvTemplate>, ICvTemplateRepository
    {
        public CvTemplateRepository(DbContext context) : base(context)
        {
        }
    }
}
