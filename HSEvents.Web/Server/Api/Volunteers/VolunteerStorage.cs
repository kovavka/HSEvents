using System.Collections.Generic;
using System.Linq;
using Domain.Events;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.Volunteers
{
    public interface IVolunteerStorage
    {
        IEnumerable<Volunteer> GetAll();
    }

    public class VolunteerStorage : IVolunteerStorage
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
