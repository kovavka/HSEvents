using System.Collections.Generic;
using Domain.Events;

namespace HSEvents.Server.Api.Volunteers
{
    public interface IVolunteerService
    {
        IEnumerable<Volunteer> GetAll();
    }

    public class VolunteerService : IVolunteerService
    {
        private readonly IVolunteerStorage volunteerStorage;

        public VolunteerService(IVolunteerStorage volunteerStorage)
        {
            this.volunteerStorage = volunteerStorage;
        }
        
        public IEnumerable<Volunteer> GetAll()
        {
           return volunteerStorage.GetAll();
        }
    }
}
