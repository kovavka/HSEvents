using System.Collections.Generic;
using System.Linq;
using Domain.IEntity;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.Empty
{
    public interface IStorage
    {
        IEnumerable<Entity> GetAll();
    }

    public class Storage : IStorage
    {
        public IEnumerable<Entity> GetAll()
        {
            using (var repo = new NHGetAllRepository<Entity>())
            {
                return repo.GetAll().AsEnumerable();
            }
        }
    }
}
