using Microsoft.Extensions.Configuration;

namespace Repository.DataContext.Configuration;

public class AppConfiguration
{

    public string SqlConnectionString { get; set; }

    public AppConfiguration()
    {
        var configBuilder = new ConfigurationBuilder();
        var path = Path.Combine(Directory.GetCurrentDirectory(), "../API/appsettings.json");
        configBuilder.AddJsonFile(path, false);
        var root = configBuilder.Build();
        var appsetting = root.GetSection("ConnectionStrings:DefaultConnection");
        SqlConnectionString = appsetting.Value;
    }

}