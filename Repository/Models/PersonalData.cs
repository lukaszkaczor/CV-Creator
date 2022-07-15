using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repository.Models
{
    public class PersonalData
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public CurriculumVitae CurriculumVitae { get; set; }
        public Guid CurriculumVitaeId { get; set; }
    }
}