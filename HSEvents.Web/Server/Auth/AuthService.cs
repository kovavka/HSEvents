using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Security;
using Domain;
using Infrastructure.Repositories;
using Microsoft.Practices.Unity;

namespace HSEvents.Server.Auth
{
    public interface IAuthService
    {
        HttpActionContext ActionContext { get; set; }

        AuthInfo Login(AuthArgs authInfo);
        
        IPrincipal CurrentUser { get; }
    }

    public class AuthService : IAuthService
    {
        private const string cookieName = "__AUTH_COOKIE";

        public HttpActionContext ActionContext { get; set; }

        [Dependency]
        public IUserRepository Repository { get; set; }

        public AuthInfo Login(AuthArgs authInfo)
        {
            User user = Repository.Login(authInfo.Login, authInfo.Password);

            if (user != null)
            {
                var roles = user.IsAdmin ? "admin" : "";
                return new AuthInfo()
                {
                    Token = GetToken(authInfo.Login, roles, true),
                    User = user
                };
            }

            return null;
        }

        private string GetToken(string login, string roles, bool isPersistent = false)
        {
            var ticket = new FormsAuthenticationTicket(
                1,
                login,
                DateTime.Now,
                DateTime.Now.Add(FormsAuthentication.Timeout),
                isPersistent,
                roles,
                FormsAuthentication.FormsCookiePath);

           return FormsAuthentication.Encrypt(ticket);
        }

        private IPrincipal _currentUser;

        public IPrincipal CurrentUser
        {
            get
            {
                if (_currentUser?.Identity.Name == null)
                {
                    try
                    {
                        var authCookie = ActionContext.Request.Headers.GetCookies(cookieName).FirstOrDefault()?[cookieName];
                        if (authCookie != null && !string.IsNullOrEmpty(authCookie.Value))
                        {
                            var ticket = FormsAuthentication.Decrypt(authCookie.Value);
                            _currentUser = new UserProvider(ticket.Name, Repository);
                        }
                        else
                        {
                            _currentUser = new UserProvider(null, null);
                        }
                    }
                    catch (Exception ex)
                    {
                        _currentUser = new UserProvider(null, null);
                    }
                }
                return _currentUser;
            }
        }
    }
}