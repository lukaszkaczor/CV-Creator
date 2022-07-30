namespace Repository.Models;

public class CurriculumVitae
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    // public DateTime CreationDate { get; set; }
    public DateTime ModificationDate { get; set; }

    public ApplicationUser ApplicationUser { get; set; }
    public string ApplicationUserId { get; set; }

    public PersonalData PersonalData { get; set; }
    public CvAddress CvAddress { get; set; }
    public ContactData ContactData { get; set; }
    // public Guid PersonalDataId { get; set; }
}