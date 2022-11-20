using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Duende.IdentityServer.Extensions;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace API.Utilities
{
    public static class CurrentUser
    {
        public static string GetCurrentUser(IHttpContextAccessor httpContextAccessor)
        => httpContextAccessor.HttpContext.User.Identity.Name;
    }
}