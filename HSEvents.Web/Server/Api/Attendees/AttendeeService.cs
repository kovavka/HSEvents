using System.Collections.Generic;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Attendees
{
    public interface IAttendeeService
    {
        IEnumerable<AttendeeDto> GetAll();
        IEnumerable<AttendeeDto> GetAll(long eventId);
        void Add(AttendeeDto attendee);
        void Update(AttendeeDto attendee);
        void Delete(long id);
    }

    public class AttendeeService : IAttendeeService
    {
        private readonly IAttendeeStorage attendeeStorage;

        public AttendeeService(IAttendeeStorage attendeeStorage)
        {
            this.attendeeStorage = attendeeStorage;
        }
        
        public IEnumerable<AttendeeDto> GetAll()
        {
           return attendeeStorage.GetAll();
        }

        public IEnumerable<AttendeeDto> GetAll(long eventId)
        {
           return attendeeStorage.GetAll(eventId);
        }
        
        public void Add(AttendeeDto attendee)
        {
            attendeeStorage.Add(attendee);
        }

        public void Update(AttendeeDto attendee)
        {
            attendeeStorage.Update(attendee);
        }

        public void Delete(long id)
        {
            attendeeStorage.Delete(id);
        }
    }
}
