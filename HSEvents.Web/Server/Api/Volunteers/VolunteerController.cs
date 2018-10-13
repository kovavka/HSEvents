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
    }
}
