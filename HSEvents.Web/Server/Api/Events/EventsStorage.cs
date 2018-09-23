using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Domain.Events;
using HSEvents.Server.Api.Events.Models;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.Events
{
    public interface IEventsStorage
    {
        IEnumerable<Event> GetForMonth(DateTime fromDate, DateTime toDate);
        Event Get(int id);
    }

    public class EventsStorage : IEventsStorage
    {
        public IEnumerable<Event> GetForMonth(DateTime fromDate, DateTime toDate)
        {
            using (var repo = new EventRepository())
            {
                return repo.GetForMonth(fromDate, toDate);
            }
        }
        public Event Get(int id)
        {
            using (var repo = new EventRepository())
            {
                return repo.Get(id);
            }
        }
    }
}
