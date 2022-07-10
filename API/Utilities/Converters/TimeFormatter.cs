using AutoMapper;

namespace API.Utilities.Converters;

public class TimeFormatter : IValueConverter<DateTime, string>
{
    public string Convert(DateTime sourceMember, ResolutionContext context)
    {
        return sourceMember.ToLongTimeString();
    }
}