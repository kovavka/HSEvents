using System.Collections.Generic;
using Domain.Events;

namespace HSEvents.Server.Api.Volunteers
{
    public interface IVolunteerService
    {
        IEnumerable<Volunteer> GetAll();
        Volunteer Get(long id);
        Volunteer Add(Volunteer subject);
        void Update(Volunteer subject);
        void Delete(long id);
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

        public Volunteer Get(long id)
        {
            return volunteerStorage.Get(id);
        }

        public Volunteer Add(Volunteer subject)
        {
            return volunteerStorage.Add(subject);
        }

        public void Update(Volunteer subject)
        {
            volunteerStorage.Update(subject);
        }

        public void Delete(long id)
        {
            volunteerStorage.Delete(id);
        }
    }
}
