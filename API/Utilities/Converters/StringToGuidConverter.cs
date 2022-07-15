using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Duende.IdentityServer.Extensions;

namespace API.Utilities.Converters
{
    public class StringToGuidConverter : IValueConverter<string, Guid>
    {
        public Guid Convert(string sourceMember, ResolutionContext context)
        {
            if (sourceMember.IsNullOrEmpty())
                sourceMember = "00000000-0000-0000-0000-000000000000"; // default Guid 
            return new Guid(sourceMember);
        }
    }
}