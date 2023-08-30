using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using Repository.Models;

namespace Repository.Repositories;


public class CvEducationRepository : Repository<CvEducation>, ICvEducationRepository
{
    public CvEducationRepository(DbContext context) : base(context)
    {
    }
}