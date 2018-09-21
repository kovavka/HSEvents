using System.Collections.Generic;

namespace Domain.Events
{
    public class AcademicCompetition : Event
    {
        public virtual Subject Subject { get; set; }
        public virtual ICollection<Result> Results { get; set; }
    }
}
