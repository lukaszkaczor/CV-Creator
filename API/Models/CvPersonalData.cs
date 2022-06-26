

namespace API.Models;

public class CvPersonalData
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    // public int CvIdentificator { get; set; }

    public CurriculumVitae CurriculumVitae { get; set; }
    public int CurriculumVitaeId { get; set; }
}