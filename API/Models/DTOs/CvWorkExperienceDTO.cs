namespace API.Models.DTOs;

public class CvWorkExperienceDTO{
    public string Id { get; set; }
    public string Name { get; set; }
    public string CompanyName { get; set; }
    public string City { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool StillEmployed { get; set; }
    public string Description { get; set; }

    public Guid CurriculumVitaeId { get; set; }
}