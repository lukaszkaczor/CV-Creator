using Repository.Interfaces;
using Repository.Models;

public class Language : IIdentificator{
    public Guid Id { get; set; }
    public string LanguageName { get; set; }
    public string Level { get; set; }

    public CurriculumVitae CurriculumVitae { get; set; }
    public Guid CurriculumVitaeId { get; set; }
}