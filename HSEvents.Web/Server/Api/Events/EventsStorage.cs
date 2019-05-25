using System;
using System.Collections.Generic;
using Domain.Events;
using HSEvents.Server.Api.Events.Models;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Events
{
    public interface IEventsStorage
    {
        IEnumerable<Event> GetForMonth(DateTime fromDate, DateTime toDate);
        EventDto Get(int id);
        IEnumerable<EventDto> GetByArgs(EventFilters args);
        EventDto Add(EventDto entity);
        void Update(EventDto entity);
        void Delete(int id);
        void Delete(long[] ids);
        void AddRegistration(long id, long attendeeId);
        void DeleteRegistration(long id, long attendeeId);
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

        public void AddRegistration(long id, long attendeeId)
        {
            using (var repo = new EventRepository())
            {
                repo.AddRegistration(id, attendeeId);
            }
        }

        public void DeleteRegistration(long id, long attendeeId)
        {
            using (var repo = new EventRepository())
            {
                repo.DeleteRegistration(id, attendeeId);
            }
        }

        public IEnumerable<EventDto> GetByArgs(EventFilters args)
        {
            using (var repo = new EventRepository())
            {
                return repo.GetByArgs(args);
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

        public void Delete(long[] ids)
        {
            using (var repo = new EventRepository())
            {
                repo.Delete(ids);
            }
        }
    }
}
