using System.Web.Http;
using Domain.Events;
using HSEvents.Server.Api.Events.Models;
using Infrastructure.Repositories.Dto;

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
            return eventsService.GetMonth(year, month);
        }

        [HttpGet]
        public EventDto Get(int id)
        {
            return eventsService.Get(id);
        }

        [HttpPut]
        public EventDto Add(EventDto entity)
        {
            return eventsService.Add(entity);
        }

        [HttpPut]
        public void Update(EventDto entity)
        {
            eventsService.Update(entity);
        }

        [HttpPost]
        public void Delete(int id)
        {
            eventsService.Delete(id);
        }
    }
}
