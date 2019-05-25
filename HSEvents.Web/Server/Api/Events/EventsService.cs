using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Domain.Events;
using HSEvents.Server.Api.Events.Models;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Events
{
    public interface IEventsService
    {
        Month GetMonth(int year, int month);
        EventDto Get(int id);
        IEnumerable<EventDto> GetByArgs(EventFilters args);
        EventDto Add(EventDto entity);
        void Update(EventDto entity);
        void Delete(int id);
        void Delete(long[] ids);
        void AddRegistration(long id, long attendeeId);
        void DeleteRegistration(long id, long attendeeId);
    }

    public class EventsService : IEventsService
    {
        private readonly CultureInfo cultureInfo;
        private readonly DateTimeFormatInfo format;
        private readonly IEventsStorage eventsStorage;

        public EventsService(IEventsStorage eventsStorage)
        {
            this.eventsStorage = eventsStorage;
            cultureInfo = new CultureInfo("ru-RU");
            format = cultureInfo.DateTimeFormat;
        }
        
        public EventDto Get(int id)
        {
           return eventsStorage.Get(id);
        }

        public IEnumerable<EventDto> GetByArgs(EventFilters args)
        {
            return eventsStorage.GetByArgs(args);
        }
        
        public EventDto Add(EventDto dto)
        {
            return eventsStorage.Add(dto);
        }

        public void Update(EventDto dto)
        {
            eventsStorage.Update(dto);
        }

        public void Delete(int id)
        {
            eventsStorage.Delete(id);
        }

        public void AddRegistration(long id, long attendeeId)
        {
            eventsStorage.AddRegistration(id, attendeeId);
        }

        public void DeleteRegistration(long id, long attendeeId)
        {
            eventsStorage.DeleteRegistration(id, attendeeId);
        }

        public void Delete(long[] ids)
        {
            eventsStorage.Delete(ids);
        }

        public Month GetMonth(int year, int month)
        {
            var fromDate = CalculateFromDate(year, month);
            var toDate = CalculateToDate(year, month);

            var events = GetEvents(fromDate, toDate);

            var weeks = new List<Week>();

            var currentDate = fromDate;

            while (currentDate < toDate)
            {
                var days = new List<EventDay>();
                for (int i = 0; i < 7; i++)
                {
                    days.Add(new EventDay()
                    {
                        Events = events.Where(x => x.Date.Date == currentDate).ToList(),
                        Date = currentDate
                    });

                    currentDate = currentDate.AddDays(1);
                }

                weeks.Add(new Week() {Days = days});
            }
            
            return new Month()
            {
                Name = format.MonthNames[month - 1],
                Weeks = weeks
            };

        }

        private DateTime CalculateFromDate(int year, int month)
        {
            var monthStart = new DateTime(year, month, 1);
            
            int needToAddFirst;
            if (monthStart.DayOfWeek == DayOfWeek.Sunday)
                needToAddFirst = 6;
            else
                needToAddFirst = (int)monthStart.DayOfWeek - 1;

            return monthStart.AddDays(-needToAddFirst);
        }

        private DateTime CalculateToDate(int year, int month)
        {
            var monthEnd = new DateTime(year, month, 1).AddMonths(1).AddDays(-1);
           
            int needToAddLast;
            if (monthEnd.DayOfWeek == DayOfWeek.Sunday)
                needToAddLast = 0;
            else
                needToAddLast = 7 - (int)monthEnd.DayOfWeek;

            return monthEnd.AddDays(needToAddLast);
        }

        private List<EventItem> GetEvents(DateTime fromDate, DateTime toDate)
        {
            var events = eventsStorage.GetForMonth(fromDate, toDate).ToList();

            var dates = events
                .Select(x => new
                {
                    Event = x,
                    Executions = x.EventExecutions
                        .Select(execution => new
                        {
                            Dates = execution.Dates.Where(xx => xx.Date.Date >= fromDate && xx.Date.Date <= toDate),
                            Address = execution.Address.FullAddress
                        })
                        .Where(execution => execution.Dates.Any())
                        .SelectMany(execution => execution.Dates.Select(xx => new {execution.Address, Date = xx}))
                })
                .SelectMany(x => x.Executions.Select(execution => new {x.Event, execution.Date, execution.Address}));



            return dates.Select(x => new EventItem()
            {
                Id = x.Event.Id,
                Name = x.Event.Name,
                Type = x.Event.Type,
                Info = x.Event.Info,
                Color = GetColor(x.Event.Departments),
                Date = x.Date.Date,
                Address = x.Address,
                DateAndTime = GetDateAndTime(x.Date),
            }).ToList();
        }
        
        private string GetDateAndTime(EventDate date)
        {
            var dayfWeek = cultureInfo.DateTimeFormat.GetDayName(date.Date.DayOfWeek);
            var month = format.MonthGenitiveNames[date.Date.Month - 1];
            var time = string.Empty;

            var start = date.StartTime?.ToString(@"hh\:mm");
            var end = date.EndTime?.ToString(@"hh\:mm");

            if (start != null && end != null)
                time = $", {start} — {end}";
            else if (start != null)
                time = $", с {start}";
            else if (end != null)
                time = $", до {end}";

            return $"{dayfWeek}, {date.Date.Day} {month}{time}";

        }

        private string GetColor(ICollection<Department> departments)
        {
            if (!departments.Any() || departments.Count > 1)
                return "";

            return departments.First().Color;
        }
    }
}
