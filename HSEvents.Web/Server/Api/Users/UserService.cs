using System.Collections.Generic;
using Domain;

namespace HSEvents.Server.Api.Users
{
    public interface IUserService
    {
        IEnumerable<User> GetAll();
    }

    public class UserService : IUserService
    {
        private readonly IUserStorage userStorage;

        public UserService(IUserStorage userStorage)
        {
            this.userStorage = userStorage;
        }
        
        public IEnumerable<User> GetAll()
        {
           return userStorage.GetAll();
        }
    }
}
