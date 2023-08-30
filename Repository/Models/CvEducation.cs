
using Repository.Interfaces;

namespace Repository.Models;

public class CvEducation : IIdentificator{
    public Guid Id { get; set; }
    public string Degree { get; set; }
    public string SchoolName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool StillStudying { get; set; }
    public string Description { get; set; }

    public CurriculumVitae CurriculumVitae { get; set; }
    public Guid CurriculumVitaeId { get; set; }
}