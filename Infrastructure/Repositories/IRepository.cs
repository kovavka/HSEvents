using System;
using System.Linq;
using Domain.IEntity;
using NHibernate;
using NHibernate.Linq;

namespace Infrastructure.Repositories
{
    public interface IRepository<T>:IDisposable where T:IEntity
    {
        T Get(int id);
        void Delete(int id);
        void Update(T entity);
        object Add(T entity);
        void Delete(T entity);
    }

    public class NHRepository<T> : IRepository<T> where T : IEntity
    {
        private ISession session = NHibernateHelper.OpenSession();
        
        public T Get(int id)
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

        public void Delete(int id)
        {
            using (var tx = session.BeginTransaction())
            {
                session.Delete(session.Query<T>().First(x => x.Id == id));
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

        public object Add(T entity)
        {
            object result;
            using (var tx = session.BeginTransaction())
            {
                result = session.Save(entity);
                tx.Commit();
            }

            return result;
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
