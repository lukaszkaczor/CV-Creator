
using API.Models;
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
        opt => opt.ConvertUsing(new GuidToStringConverter(), src => src.Id));

        CreateMap<PersonalDataDTO, PersonalData>()
        .ForMember(d => d.Id,
        opt => opt.ConvertUsing(new StringToGuidConverter(), src => src.Id));


    }
}
