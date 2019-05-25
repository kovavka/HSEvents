using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Security;
using Domain.Events;
using HSEvents.Server.Api.Events.Models;
using HSEvents.Server.Auth;
using Infrastructure.Repositories;
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
            //todo сделать нормальную аутентификацию, а не вот это вот все
            var authCookie = ActionContext.Request.Headers.GetCookies(AuthService.CookieName).FirstOrDefault()?[AuthService.CookieName];
            if (authCookie != null && !string.IsNullOrEmpty(authCookie.Value))
            {
                var ticket = FormsAuthentication.Decrypt(authCookie.Value);
                var rtr = ticket.UserData;
            }


            return eventsService.GetMonth(year, month);
        }

        [HttpGet]
        public IEnumerable<EventDto> GetByArgs([FromUri]EventFilters args)
        {
            return eventsService.GetByArgs(args);
        }

        [HttpGet]
        public EventDto Get(int id)
        {
            return eventsService.Get(id);
        }

        [HttpGet]
        public void AddRegistration(long id, long attendeeId)
        {
            eventsService.AddRegistration(id, attendeeId);
        }

        [HttpGet]
        public void DeleteRegistration(long id, long attendeeId)
        {
            eventsService.DeleteRegistration(id, attendeeId);
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

        [HttpPost]
        public void DeleteSeveral([FromBody] long[] ids)
        {
            eventsService.Delete(ids);
        }
    }
}
