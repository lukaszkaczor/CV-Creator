namespace API.Models.DTOs;

public class CurriculumVitaeDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string CreationDate { get; set; }
    public string CreationTime { get; set; }
    public PersonalDataDTO PersonalData { get; set; }
    public CvAddressDTO CvAddress { get; set; }
    public ContactDataDTO ContactData { get; set; }
    public IEnumerable<CvWorkExperienceDTO> WorkExperience { get; set; }
    public IEnumerable<CvEducationDTO> Education { get; set; }
}