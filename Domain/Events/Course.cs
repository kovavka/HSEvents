
namespace Domain.Events
{
    public class Course: Event
    {
        public virtual decimal? Price { get; set; }
        public virtual int? Duration { get; set; }
        public virtual Subject Subject { get; set; }    
        public virtual int ExamYear { get; set; }    
    }
}
