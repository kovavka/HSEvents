using Domain.IEntity;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api
{
    public class SimpleEntityStorage<T> where T : Entity
    {
        public T Get(long id)
        {
            using (var repo = new NHGetAllRepository<T>())
            {
                return repo.Get(id);
            }
        }

        public T Add(T entity)
        {
            using (var repo = new NHGetAllRepository<T>())
            {
                return repo.Add(entity);
            }
        }

        public void Update(T entity)
        {
            using (var repo = new NHGetAllRepository<T>())
            {
                repo.Update(entity);
            }
        }

        public void Delete(long id)
        {
            using (var repo = new NHGetAllRepository<T>())
            {
                repo.Delete(id);
            }
        }

        public void Delete(long[] ids)
        {
            using (var repo = new NHGetAllRepository<T>())
            {
                repo.Delete(ids);
            }
        }
    }
}