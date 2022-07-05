using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Repository.DataContext.Configuration;

public class DatabaseContextFactory : IDesignTimeDbContextFactory<DatabaseContext>
{
    public DatabaseContext CreateDbContext(string[] args)
    {
        var AppConfig = new AppConfiguration();
        var OptionsBuilder = new DbContextOptionsBuilder<DatabaseContext>();
        OptionsBuilder.UseSqlServer(AppConfig.SqlConnectionString);

        return new DatabaseContext(OptionsBuilder.Options, new OperationalStoreOptionsMigrations());
    }
}
