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
using Infrastructure.Repositories.Dto;
using Microsoft.Practices.Unity;

namespace HSEvents.Server.Auth
{
    public interface IAuthService
    {
        HttpActionContext ActionContext { get; set; }

        AuthInfo Login(AuthArgs authInfo);

        AuthInfo SignUp(AttendeeDto dto);

        IPrincipal CurrentUser { get; }
    }

    public class AuthService : IAuthService
    {
        public static string CookieName = "__AUTH_COOKIE";

        public HttpActionContext ActionContext { get; set; }

        [Dependency]
        public IUserRepository userRepository { get; set; }

        public AuthInfo Login(AuthArgs authInfo)
        {
            var user = userRepository.Login(authInfo.Login, authInfo.Password);
            //todo по идее это уже должно быть в пользователе, надо переделать бд и маппинги
            var employee = userRepository.GetEmployee(user.Id);
            var attendee = userRepository.GetAttendee(user.Id);

            if (user != null)
            {
                var role = user.Type.ToString();
                return new AuthInfo()
                {
                    Token = GetToken(authInfo.Login, role, true),
                    User = user,
                    Employee = employee,
                    Attendee = attendee,
                };
            }

            return null;
        }

        public AuthInfo SignUp(AttendeeDto dto)
        {
            var attendee = userRepository.SignUp(dto);
            
            var role = attendee.Type.ToString();
            return new AuthInfo()
            {
                Token = GetToken(attendee.User.Login, role, true),
                User = attendee.User
            };
        }

        private string GetToken(string login, string role, bool isPersistent = false)
        {
            var ticket = new FormsAuthenticationTicket(
                1,
                login,
                DateTime.Now,
                DateTime.Now.Add(FormsAuthentication.Timeout),
                isPersistent,
                role,
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
                        var authCookie = ActionContext.Request.Headers.GetCookies(CookieName).FirstOrDefault()?[CookieName];
                        if (authCookie != null && !string.IsNullOrEmpty(authCookie.Value))
                        {
                            var ticket = FormsAuthentication.Decrypt(authCookie.Value);
                            _currentUser = new UserProvider(ticket.Name, userRepository);
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