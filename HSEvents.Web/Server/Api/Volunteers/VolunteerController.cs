using System.Collections.Generic;
using System.Web.Http;
using Domain.Events;

namespace HSEvents.Server.Api.Volunteers
{
    [AllowAnonymous]
    public class VolunteerController : ApiController
    {
        private readonly IVolunteerService volunteerService;
        public VolunteerController(IVolunteerService volunteerService)
        {
            this.volunteerService = volunteerService;
        }

        [HttpGet]
        public IEnumerable<Volunteer> GetAll()
        {
            return volunteerService.GetAll();
        }

        [HttpGet]
        public Volunteer Get(long id)
        {
            return volunteerService.Get(id);
        }

        [HttpPut]
        public Volunteer Add(Volunteer subject)
        {
            return volunteerService.Add(subject);
        }

        [HttpPut]
        public void Update(Volunteer subject)
        {
            volunteerService.Update(subject);
        }

        [HttpPost]
        public void Delete([FromBody] long id)
        {
            volunteerService.Delete(id);
        }
    }
}
