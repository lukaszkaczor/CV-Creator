using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.DTOs;

public class CvPersonalDataDTO
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int CurriculumVitaeId { get; set; }
}