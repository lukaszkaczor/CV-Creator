using API.Data;
using API.Models;
using API.Models.DTOs;
using AutoMapper;

namespace API.Utilities;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<CreditentialsDTO, ApplicationUser>().ForMember(d => d.UserName, s => s.MapFrom(d => d.Email)).ReverseMap();
        CreateMap<CvPersonalDataDTO, CvPersonalData>();
    }
}