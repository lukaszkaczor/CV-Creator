using API.Data;
using API.Models;
using API.Models.DTOs;
using AutoMapper;

namespace API.Utilities
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<CreditentialsDTO, ApplicationUser>().ReverseMap();
        }
    }
}