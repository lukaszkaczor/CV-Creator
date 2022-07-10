using AutoMapper;

namespace API.Utilities.Converters;

public class DateFormatter : IValueConverter<DateTime, string>
{
    string IValueConverter<DateTime, string>.Convert(DateTime sourceMember, ResolutionContext context)
    {
        return sourceMember.ToShortDateString();
    }
}