using System.Security.Principal;
using Infrastructure.Repositories;

namespace HSEvents.Server.Auth
{
    public class UserProvider : IPrincipal
    {
        private UserIdentity userIdentity { get; set; }
        
        public IIdentity Identity
        {
            get { return userIdentity; }
        }

        public bool IsInRole(string role)
        {
            if (userIdentity.User == null)
            {
                return false;
            }

            if (role == "admin")
                return userIdentity.User.IsAdmin;

            return true;
        }
        
        public UserProvider(string name, IUserRepository repository)
        {
            userIdentity = new UserIdentity();
            userIdentity.Init(name, repository);
        }

        public override string ToString()
        {
            return userIdentity.Name;
        }
    }
}