using System.Data;
using System.Linq;
using Domain.IEntity;
using NHibernate;
using NHibernate.Linq;

namespace Infrastructure.Repositories
{
    public interface IGetAllRepository<T> : IRepository<T> where T : IEntity
    {
        IQueryable<T> GetAll();
    }

    public class NHGetAllRepository<T> : NHRepository<T>, IGetAllRepository<T> where T : IEntity
    {
        private ISession session = NHibernateHelper.OpenSession();
        
        public IQueryable<T> GetAll()
        {
            IQueryable<T> result;
            using (var tx = session.BeginTransaction(IsolationLevel.ReadCommitted))
            {
                result = session.Query<T>();
                tx.Commit();
            }

            return result;
        }

    }

}
