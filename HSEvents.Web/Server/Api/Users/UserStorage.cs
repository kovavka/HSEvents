using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.Users
{
    public interface IUserStorage
    {
        IEnumerable<User> GetAll();
    }

    public class UserStorage : IUserStorage
    {
        public IEnumerable<User> GetAll()
        {
            using (var repo = new NHGetAllRepository<User>())
            {
                return repo.GetAll().AsEnumerable();
            }
        }
    }
}
