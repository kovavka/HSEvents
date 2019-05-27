using System.Collections.Generic;
using System.Web.Http;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Attendees
{
    [AllowAnonymous]
    public class AttendeeController : ApiController
    {
        private readonly IAttendeeService attendeeService;
        public AttendeeController(IAttendeeService attendeeService)
        {
            this.attendeeService = attendeeService;
        }

        [HttpGet]
        public IEnumerable<AttendeeDto> GetAll()
        {
            return attendeeService.GetAll();
        }

        [HttpGet]
        public IEnumerable<AttendeeDto> GetAllByEvent(long eventId)
        {
            return attendeeService.GetAll(eventId);
        }


        [HttpPut]
        public void Add(AttendeeDto attendee)
        {
            attendeeService.Add(attendee);
        }

        [HttpPut]
        public void Update(AttendeeDto attendee)
        {
            attendeeService.Update(attendee);
        }

        [HttpPost]
        public void Delete([FromBody] long id)
        {
            attendeeService.Delete(id);
        }
    }
}
