
using Domain.Events;

namespace HSEvents.Server.Api.Events.Models
{
    public class SimpleEvent
    {
        public string Name { get; set; }
        public EventType Type { get; set; }
        public string Info { get; set; }
    }
}