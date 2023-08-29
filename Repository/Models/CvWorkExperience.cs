
using Repository.Interfaces;

namespace Repository.Models;

public class CvWorkExperience : IIdentificator{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string CompanyName { get; set; }
    public string City { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool StillEmployed { get; set; }
    public string Description { get; set; }

    public CurriculumVitae CurriculumVitae { get; set; }
    public Guid CurriculumVitaeId { get; set; }
}