using Domain.IEntity;

namespace Domain.Events
{
    public class Volunteer : Entity
    {
        public virtual string FullName { get; set; }
        public virtual Group Group { get; set; }
    }

    public class Group : NamedEntity
    {
        
    }
}
