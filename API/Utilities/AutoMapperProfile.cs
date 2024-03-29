using API.Models.DTOs;
using API.Utilities.Converters;
using AutoMapper;
using Repository.Models;

namespace API.Utilities;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<CreditentialsDTO, ApplicationUser>().ForMember(d => d.UserName, s => s.MapFrom(d => d.Email)).ReverseMap();

        CreateMap<CurriculumVitae, CurriculumVitaeDTO>()
        .ForMember(d => d.CreationDate,
        opt => opt.ConvertUsing(new DateFormatter(), src => src.ModificationDate))
        .ForMember(d => d.CreationTime,
        opt => opt.ConvertUsing(new TimeFormatter(), src => src.ModificationDate));

        CreateMap<PersonalData, PersonalDataDTO>()
        .ForMember(d => d.Id,
        opt => opt.ConvertUsing(new GuidToStringConverter(), src => src.Id))
         .ForMember(d => d.Birthday,
        opt => opt.ConvertUsing(new DateFormatter(), src => src.DateOfBirth));

        CreateMap<PersonalDataDTO, PersonalData>()
        .ForMember(d => d.Id,
        opt => opt.ConvertUsing(new StringToGuidConverter(), src => src.Id))
        .ForMember(d => d.DateOfBirth,
        opt => opt.ConvertUsing(new StringToDateTimeConverter(), src => src.Birthday));

        // CreateMap<CvAddressDTO, CvAddress>().ReverseMap();

        CreateMap<CvAddress, CvAddressDTO>()
       .ForMember(d => d.Id,
       opt => opt.ConvertUsing(new GuidToStringConverter(), src => src.Id));

        CreateMap<CvAddressDTO, CvAddress>()
        .ForMember(d => d.Id,
        opt => opt.ConvertUsing(new StringToGuidConverter(), src => src.Id));

        //----
        CreateMap<ContactData, ContactDataDTO>()
       .ForMember(d => d.Id,
       opt => opt.ConvertUsing(new GuidToStringConverter(), src => src.Id));

        CreateMap<ContactDataDTO, ContactData>()
        .ForMember(d => d.Id,
        opt => opt.ConvertUsing(new StringToGuidConverter(), src => src.Id));

        CreateMap<CvTemplate, CvTemplateDTO>()
            .ForMember(d=>d.Name, s=>s.MapFrom(d=>d.Name)).ReverseMap();
        CreateMap<CvTemplate, CvTemplateDTO>()
            .ForMember(d=>d.HtmlContent, s=>s.MapFrom(d=>d.HtmlContent)).ReverseMap();
        CreateMap<CvTemplate, CvTemplateDTO>()
           .ForMember(d => d.Styles, s => s.MapFrom(d => d.Styles)).ReverseMap();
        CreateMap<CvTemplate, CvTemplateDTO>()
           .ForMember(d => d.IsActive, s => s.MapFrom(d => d.IsActive)).ReverseMap();


        CreateMap<CvWorkExperienceDTO, CvWorkExperience>()
        .ForMember(d => d.Id,
        opt => opt.ConvertUsing(new StringToGuidConverter(), src => src.Id)).ReverseMap();


        CreateMap<CvEducationDTO, CvEducation>()
        .ForMember(d => d.Id,
        opt => opt.ConvertUsing(new StringToGuidConverter(), src => src.Id)).ReverseMap();

        CreateMap<CvLanguageDTO, Language>()
        .ForMember(d => d.Id,
        opt => opt.ConvertUsing(new StringToGuidConverter(), src => src.Id)).ReverseMap();
    }
}
