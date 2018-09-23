using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web.Http;
using Domain.Events;
using Helpers;
using HSEvents.Server.Api.Events.Models;
using Infrastructure.Repositories;

namespace HSEvents.Controllers
{
    [AllowAnonymous]
    public class EventsController : ApiController
    {

        [HttpGet]
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


            var cultureInfo = new CultureInfo("ru-RU");
            var format = cultureInfo.DateTimeFormat;

            var monthStart = new DateTime(year, month, 1);
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
            var repo = new EventRepository();
            
            var dates = repo.GetAll()
                .Where(x => x.EventExecutions.Any(xx => xx.Dates.Any(d => d.Date >= fromDate && d.Date <= toDate)))
                .ToList()
                .Select(x => new {Event = x, Dates = x.EventExecutions.SelectMany(xx => xx.Dates)})
                .SelectMany(x => x.Dates.Select(xx => new {x.Event, xx.Date})).ToList();


            var events = dates.Where(x => x.Date.Date >= fromDate && x.Date.Date <= toDate);

            return events.ToList().Select(x => new EventItem()
            {
                Id = x.Event.Id,
                Name = x.Event.Name,
                Color = GetColor(x.Event.Departments),
                Date = x.Date
            }).ToList();
        }

        private string GetColor(ICollection<Department> departments)
        {
            if (!departments.Any() || departments.Count() > 1)
                return "";

            return departments.First().Color;
        }
    }
}
