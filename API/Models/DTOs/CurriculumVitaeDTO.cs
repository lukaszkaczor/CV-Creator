namespace API.Models.DTOs;

public class CurriculumVitaeDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string CreationDate { get; set; }
    public string CreationTime { get; set; }
    public PersonalDataDTO PersonalData { get; set; }
}