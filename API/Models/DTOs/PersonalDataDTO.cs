using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.DTOs;

public class PersonalDataDTO
{
    public string Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Birthday { get; set; }
    public Guid CurriculumVitaeId { get; set; }
}