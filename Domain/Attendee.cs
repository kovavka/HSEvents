using System.ComponentModel;
using Domain.IEntity;

namespace Domain
{
    public class Attendee : PersonEntity
    {
        public virtual AttendeeType Type { get; set; }
        public virtual User User { get; set; }
    }

    public enum AttendeeType
    {
        [Description("Абитуриент")] Pupil = 1,
        [Description("Родитель")] Parent = 2,
        [Description("Учитель")] Teacher = 3,
    }

    public class AttendanceInfo : Entity
    {
        public virtual Attendee Attendee { get; set; }
        public virtual bool Participated { get; set; }
    }

}
