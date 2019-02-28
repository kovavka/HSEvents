using System.Collections.Generic;
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
        IQueryable<T> GetAll(IEnumerable<long> ids);
    }

    public class NHGetAllRepository<T> : NHRepository<T>, IGetAllRepository<T> where T : Entity
    {
        protected ISession session = NHibernateHelper.OpenSession();
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
        public IQueryable<T> GetAll(IEnumerable<long> ids)
        {
            IQueryable<T> result;
            using (var tx = session.BeginTransaction(IsolationLevel.ReadCommitted))
            {
                result = session.Query<T>().Where(x => ids.Contains(x.Id));
                tx.Commit();
            }

            return result;
        }
    }
}
