using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Domain.Events;
using HSEvents.Server.Api.Events.Models;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.Events
{
    public interface IEventsService
    {
        Month GetMonth(int year, int month);
        SimpleEvent Get(int id);
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

        public SimpleEvent Get(int id)
        {
            var @event = eventsStorage.Get(id);
            return new SimpleEvent()
            {
                Name = @event.Name,
                Info = @event.Info,
                Type = @event.Type
            };
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
                        Day = currentDate.Day,
                        Events = events.Where(x => x.Date.Date == currentDate).ToList(),
                        CurrentMonth = currentDate.Month == month
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
            var events = eventsStorage.GetForMonth(fromDate, toDate);

            var dates = events
                .Select(x => new
                {
                    Event = x,
                    Dates = x.EventExecutions
                        .SelectMany(xx => xx.Dates)
                        .Where(xx => xx.Date.Date >= fromDate && xx.Date.Date <= toDate)
                })
                .SelectMany(x => x.Dates.Select(xx => new {x.Event, Date = xx}));



            return dates.Select(x => new EventItem()
            {
                Id = x.Event.Id,
                Name = x.Event.Name,
                Type = x.Event.Type,
                Info = x.Event.Info,
                Color = GetColor(x.Event.Departments),
                Date = x.Date.Date,
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
