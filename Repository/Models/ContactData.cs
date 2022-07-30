namespace Repository.Models;

public class ContactData
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }

    public CurriculumVitae CurriculumVitae { get; set; }
    public Guid CurriculumVitaeId { get; set; }
}