using System.Collections.Generic;
using System.Linq;
using Domain.Events;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.Groups
{
    public interface IGroupStorage
    {
        IEnumerable<Group> GetAll();
        Group Get(long id);
        Group Add(Group group);
        void Update(Group group);
        void Delete(long id);
        void Delete(long[] ids);
    }

    public class GroupStorage : SimpleEntityStorage<Group>, IGroupStorage
    {
        public IEnumerable<Group> GetAll()
        {
            using (var repo = new NHGetAllRepository<Group>())
            {
                return repo.GetAll().AsEnumerable();
            }
        }
    }
}
