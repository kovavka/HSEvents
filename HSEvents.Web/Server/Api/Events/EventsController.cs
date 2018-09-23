using System.Web.Http;
using HSEvents.Server.Api.Events.Models;

namespace HSEvents.Server.Api.Events
{
    [AllowAnonymous]
    public class EventsController : ApiController
    {
        private readonly IEventsService eventsService;
        public EventsController(IEventsService eventsService)
        {
            this.eventsService = eventsService;
        }

        [HttpGet]
        public Month GetMonth(int year, int month)
        {
            return eventsService.GetForMonth(year, month);
        }
    }
}
