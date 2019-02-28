using System.Collections.Generic;
using Domain.IEntity;

namespace Infrastructure.Repositories
{
    public class RepositoryHelper
    {
        public static Y GetAnotherEntity<Y>(long id) where Y : Entity
        {
            using (var repo = new NHGetAllRepository<Y>())
            {
                return repo.Get(id);
            }
        }
        public static Y GetAnotherEntity<Y>(Y entity) where Y : Entity
        {
            using (var repo = new NHGetAllRepository<Y>())
            {
                return repo.Get(entity.Id);
            }
        }

        public static IEnumerable<Y> GetAnotherEntity<Y>(IEnumerable<long> ids) where Y : Entity
        {
            using (var repo = new NHGetAllRepository<Y>())
            {
                return repo.GetAll(ids);
            }
        }
    }
}
