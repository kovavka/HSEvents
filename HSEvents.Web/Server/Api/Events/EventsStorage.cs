using System;
using System.Collections.Generic;
using Domain.Events;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Events
{
    public interface IEventsStorage
    {
        IEnumerable<Event> GetForMonth(DateTime fromDate, DateTime toDate);
        EventDto Get(int id);
        EventDto Add(EventDto entity);
        void Update(EventDto entity);
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

        public EventDto Get(int id)
        {
            using (var repo = new EventRepository())
            {
                return repo.GetDto(id);
            }
        }

        public EventDto Add(EventDto entity)
        {
            using (var repo = new EventRepository())
            {
                return repo.Add(entity);
            }
        }

        public void Update(EventDto entity)
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
