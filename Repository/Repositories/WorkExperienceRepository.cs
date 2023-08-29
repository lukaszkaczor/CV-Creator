using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using Repository.Models;

namespace Repository.Repositories;


public class CvWorkExperienceRepository : Repository<CvWorkExperience>, ICvWorkExperienceRepository
{
    public CvWorkExperienceRepository(DbContext context) : base(context)
    {
    }
}