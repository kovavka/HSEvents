
using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace HSEvents.Server.Api.Events.Models
{
    public class Week
    {
        public List<EventDay> Days { get; set; }
    }

    public class EventDay
    {
        public List<EventItem> Events { get; set; }
        public int Day { get; set; }
        public bool CurrentMonth { get; set; }
    }

    public class EventItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        [JsonIgnore]
        public DateTime Date { get; set; }
    }

    public class Month
    {
        public List<Week> Weeks { get; set; }
        public string Name { get; set; }
    }
}