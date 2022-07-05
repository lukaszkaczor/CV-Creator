using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.Extensions.Options;

namespace Repository.DataContext.Configuration;

public class OperationalStoreOptionsMigrations :
IOptions<OperationalStoreOptions>
{
    public OperationalStoreOptions Value => new()
    {
        DeviceFlowCodes = new TableConfiguration("DeviceCodes"),
        EnableTokenCleanup = false,
        PersistedGrants = new TableConfiguration("PersistedGrants"),
        TokenCleanupBatchSize = 100,
        TokenCleanupInterval = 3600,
    };
}