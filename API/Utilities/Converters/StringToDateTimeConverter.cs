using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

namespace API.Utilities.Converters
{
    public class StringToDateTimeConverter : IValueConverter<string, DateTime>
    {
        public DateTime Convert(string sourceMember, ResolutionContext context)
        {
            return DateTime.Parse(sourceMember);
            // return DateTime.ParseExact(sourceMember, )
        }
    }
}