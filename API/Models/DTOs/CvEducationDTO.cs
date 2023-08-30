public class CvEducationDTO{
    public string Id { get; set; }
    public string Degree { get; set; }
    public string SchoolName { get; set; }
    public string Specialization { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool StillStudying { get; set; }
    public string Description { get; set; }

    public Guid CurriculumVitaeId { get; set; }
}