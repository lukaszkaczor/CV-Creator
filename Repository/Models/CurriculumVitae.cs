using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repository.Models
{
    public class CurriculumVitae
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        // public DateTime CreationDate { get; set; }
        public DateTime ModificationDate { get; set; }

        public ApplicationUser ApplicationUser { get; set; }
        public string ApplicationUserId { get; set; }
    }
}