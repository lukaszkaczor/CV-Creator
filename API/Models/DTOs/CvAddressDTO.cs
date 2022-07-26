namespace API.Models.DTOs;

public class CvAddressDTO
{
    public string Id { get; set; }
    public string Town { get; set; }
    public string ZipCode { get; set; }
    public string Address { get; set; }
    public string HouseNumber { get; set; }

    // public CurriculumVitae CurriculumVitae { get; set; }
    public Guid CurriculumVitaeId { get; set; }
}