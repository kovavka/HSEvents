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
        Event Add(Event entity);
        void Update(Event entity);
        void Delete(int id);
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

        public Event Add(Event entity)
        {
            using (var repo = new EventRepository())
            {
                return repo.Add(entity);
            }
        }

        public void Update(Event entity)
        {
            using (var repo = new EventRepository())
            {
                repo.Update(entity);
            }
        }
        
        public void Delete(int id)
        {
            using (var repo = new EventRepository())
            {
                repo.Delete(id);
            }
        }
    }
}
