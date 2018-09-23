using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Domain.IEntity;
using NHibernate;
using NHibernate.Linq;

namespace Infrastructure.Repositories
{
    public interface IUserRepository: IRepository<User>
    {
        User Login(string login, string password);
        User Login(string login);
        bool Exists(string login);
    }

    public class UserRepository : NHRepository<User>, IUserRepository
    {
        private ISession session = NHibernateHelper.OpenSession();

        public User Login(string login, string password)
        {
            return session.Query<User>()
                .Where(x => x.Login == login)
                .ToList()
                .FirstOrDefault(x => PasswordHelper.VerifyHashedPassword(x.Password, password));
        }

        public User Login(string login)
        {
            return session.Query<User>()
                .FirstOrDefault(x => x.Login == login);
        }

        public bool Exists(string login)
        {
            return session.Query<User>().Any(x => x.Login == login);
        }
    }
}
