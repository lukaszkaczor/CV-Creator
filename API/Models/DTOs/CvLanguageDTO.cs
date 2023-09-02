namespace API.Models.DTOs;

public class CvLanguageDTO{
    public string Id { get; set; }
    public string LanguageName { get; set; }
    public string Level { get; set; }

    public Guid CurriculumVitaeId { get; set; }
}