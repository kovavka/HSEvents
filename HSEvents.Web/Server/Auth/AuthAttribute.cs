using System;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace HSEvents.Server.Auth
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public sealed class AuthAttribute : AuthorizeAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            var container = GlobalConfiguration.Configuration.DependencyResolver;
            var auth = (IAuthService) container.GetService(typeof(IAuthService));

            auth.ActionContext = actionContext;

            var user = ((UserIdentity)auth.CurrentUser.Identity).User;
            if (user == null)
            {
                HttpContext.Current.Response.StatusCode = 401;
                HttpContext.Current.Response.End();
                return;
            }

            foreach (var role in Roles.Split(',', ' '))
            {
                if (!auth.CurrentUser.IsInRole(role))
                {
                    HttpContext.Current.Response.StatusCode = 401;
                    HttpContext.Current.Response.End();
                    return;
                }
            }
        }

       /* protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            return actionContext.Request || base.AuthorizeCore(httpContext);
        }*/
    }
}