using System;
using System.Linq;
using System.Linq.Expressions;
using Domain.IEntity;
using NHibernate;
using NHibernate.Linq;

namespace Infrastructure.Repositories
{
    public interface IRepository<T>:IDisposable where T:IEntity
    {
        T Get(long id);
        void Delete(long id);
        void Update(T entity);
        T Add(T entity);
        void Delete(T entity);
    }

    public class NHRepository<T> : IRepository<T> where T : IEntity
    {
        private ISession session = NHibernateHelper.OpenSession();
        
        public T Get(long id)
        {
            return session.Get<T>(id);
        }
        
        public void Delete(T entity)
        {
            using (var tx = session.BeginTransaction())
            {
                session.Delete(entity);
                tx.Commit();
            }
        }
        public void Delete(Expression<Func<T, bool>> predicate)
        {
            using (var tx = session.BeginTransaction())
            {
                var list = session.Query<T>().Where(predicate).ToList();
                foreach (var entity in list)
                    session.Delete(entity);
                tx.Commit();
            }
        }

        public void Delete(long id)
        {
            using (var tx = session.BeginTransaction())
            {
                session.Query<T>()
                    .Where(x => x.Id == id)
                    .Delete();
                tx.Commit();
            }
        }

        public void Delete(long[] ids)
        {
            using (var tx = session.BeginTransaction())
            {
                session.Query<T>()
                    .Where(x => ids.Contains(x.Id))
                    .Delete();
                tx.Commit();
            }
        }

        public void Update(T entity)
        {
            using (var tx = session.BeginTransaction())
            {
                session.Update(entity);
                tx.Commit();
            }
        }

        public T Add(T entity)
        {
            long id;
            using (var tx = session.BeginTransaction())
            {
                id = (long) session.Save(entity);
                tx.Commit();
            }

            return Get(id);
        }

        public void Dispose()
        {
            session.Close();
        }

        public void Close()
        {
            session.Close();
        }

    }
}
