using Microsoft.EntityFrameworkCore;

namespace Repository.DataContext.Configuration;

public class OptionsBuild
{
    public OptionsBuild()
    {
        Settings = new AppConfiguration();
        OptionsBuilder = new DbContextOptionsBuilder<DatabaseContext>();
        OptionsBuilder.UseSqlServer(Settings.SqlConnectionString);
        DbOptions = OptionsBuilder.Options;
    }

    public DbContextOptionsBuilder<DatabaseContext> OptionsBuilder { get; set; }
    public DbContextOptions<DatabaseContext> DbOptions { get; set; }
    public AppConfiguration Settings { get; set; }
}