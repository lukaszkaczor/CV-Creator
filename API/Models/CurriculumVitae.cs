using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models;

public class CurriculumVitae
{
    public int Id { get; set; }

    public CvPersonalData PersonalData { get; set; }
    public int PersonalDataId { get; set; }

    // public ApplicationUser ApplicationUser { get; set; }
    // public int MyProperty { get; set; }
}