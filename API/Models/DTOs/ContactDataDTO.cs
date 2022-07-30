using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.DTOs;

public class ContactDataDTO
{
    public string Id { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }

    public Guid CurriculumVitaeId { get; set; }
}