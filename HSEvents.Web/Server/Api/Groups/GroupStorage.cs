using System.Collections.Generic;
using System.Linq;
using Domain.Events;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.Groups
{
    public interface IGroupStorage
    {
        IEnumerable<Group> GetAll();
    }

    public class GroupStorage : IGroupStorage
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
