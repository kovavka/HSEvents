using System.Collections.Generic;
using System.Linq;
using Domain.Events;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.Volunteers
{
    public interface IVolunteerStorage
    {
        IEnumerable<Volunteer> GetAll();
        Volunteer Get(long id);
        Volunteer Add(Volunteer subject);
        void Update(Volunteer subject);
        void Delete(long id);
        void Delete(long[] ids);
    }

    public class VolunteerStorage : SimpleEntityStorage<Volunteer>, IVolunteerStorage
    {
        public IEnumerable<Volunteer> GetAll()
        {
            using (var repo = new NHGetAllRepository<Volunteer>())
            {
                return repo.GetAll().AsEnumerable();
            }
        }
    }
}
