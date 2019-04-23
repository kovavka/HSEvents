
using Domain;

namespace HSEvents.Server.Auth
{
    public class AuthInfo
    { 
        public string Token { get; set; }

        public User User { get; set; }
    }

    public class AuthArgs
    { 
        public string Login { get; set; }

        public string Password { get; set; }
    }
}