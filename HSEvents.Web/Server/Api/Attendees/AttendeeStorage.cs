using System.Collections.Generic;
using System.Linq;
using Domain;
using Domain.IEntity;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Attendees
{
    public interface IAttendeeStorage
    {
        IEnumerable<AttendeeDto> GetAll();
        IEnumerable<AttendeeDto> GetAll(long eventId);
        void Add(AttendeeDto attendee);
        void Update(AttendeeDto attendee);
        void Delete(long id);
    }

    public class AttendeeStorage : IAttendeeStorage
    {
        public IEnumerable<AttendeeDto> GetAll()
        {
            using (var repo = new UserRepository())
            {
                return repo.GetAllAttendees();
            }
        }
        public IEnumerable<AttendeeDto> GetAll(long eventId)
        {
            using (var repo = new UserRepository())
            {
                return repo.GetAllAttendees(eventId);
            }
        }
        
        public void Add(AttendeeDto attendee)
        {
            using (var repo = new UserRepository())
            {
                repo.AddAttendee(attendee);
            }
        }

        public void Update(AttendeeDto attendee)
        {
            using (var repo = new UserRepository())
            {
                repo.UpdateAttendee(attendee);
            }

        }

        public void Delete(long id)
        {
            using (var repo = new NHGetAllRepository<Attendee>())
            {
                repo.Delete(id);
            }
        }
    }
}
