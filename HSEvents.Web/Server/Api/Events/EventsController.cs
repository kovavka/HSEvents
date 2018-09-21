using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web.Http;
using HSEvents.Server.Api.Events.Models;

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
                        Events = ConvertToEventItems(events.Where(x => x.Date.Date == currentDate)),
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

            //var firstWeek = new List<EventDay>();

            //int currentDay = 1;
            //if (monthStart.DayOfWeek != DayOfWeek.Monday)
            //{
            //    if (monthStart.DayOfWeek != DayOfWeek.Sunday)
            //        for (int i = 0; i < UPPER; i++)
            //        {

            //        }
            //    firstWeek.Insert(0,new EventDay());
            //}


        }

        private List<EventItem> ConvertToEventItems(IEnumerable<Event> events)
        {
            return events.Select(x=>new EventItem()
            {
                Id = x.Id,
                Name = x.Name,
                Color = x.Color
            }).ToList();
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


        public class Event
        {
            public long Id { get; set; }
            public string Name { get; set; }
            public string Color { get; set; }

            public DateTime Date { get; set; }
        }

        private List<Event> GetEvents(DateTime fromDate, DateTime toDate)
        {
            return new List<Event>()
            {
                new Event()
                {
                    Id = 4,
                    Color = "bisque",
                    Name = "Вышка в школы",
                    Date = new DateTime(2018, 9, 15)
                },

                new Event()
                {
                    Id = 1,
                    Color = "lightgreen",
                    Name = "Вышка в школы",
                    Date = new DateTime(2018, 9, 25)
                },
                new Event()
                {
                    Id = 2,
                    Color = "bisque",
                    Name = "День вышки",
                    Date = new DateTime(2018, 9, 25)
                },
                new Event()
                {
                    Id = 3,
                    Color = "deepskyblue",
                    Name = "Полет",
                    Date = new DateTime(2018, 9, 25)
                },


                new Event()
                {
                    Id = 1,
                    Color = "lightgreen",
                    Name = "Вышка в школы",
                    Date = new DateTime(2018, 8, 28)
                },
                new Event()
                {
                    Id = 2,
                    Color = "bisque",
                    Name = "День вышки",
                    Date = new DateTime(2018, 8, 28)
                },
                new Event()
                {
                    Id = 3,
                    Color = "deepskyblue",
                    Name = "Полет",
                    Date = new DateTime(2018, 8, 28)
                },
            };

        }
    }
}
