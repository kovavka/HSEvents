using System.Security.Principal;
using Domain;
using Infrastructure.Repositories;
using Microsoft.Practices.Unity;

namespace HSEvents.Server.Auth
{
    public interface IUserProvider
    {
        User User { get; set; }
    }

    public class UserIdentity : IIdentity, IUserProvider
    {
        [Dependency]
        public IAuthService Auth { get; set; }

        public User CurrentUser
        {
            get
            {
                return ((IUserProvider)Auth.CurrentUser.Identity).User;
            }
        }

        public User User { get; set; }

        public string AuthenticationType
        {
            get
            {
                return typeof(User).ToString();
            }
        }

        public bool IsAuthenticated
        {
            get
            {
                return User != null;
            }
        }

        public string Name
        {
            get
            {
                if (User != null)
                {
                    return User.Login;
                }

                return null;
            }
        }

        public void Init(string login, IUserRepository repository)
        {
            if (!string.IsNullOrEmpty(login))
            {
                User = repository.Login(login);
            }
        }
    }
}