using Domain.IEntity;

namespace Domain.Events
{
    public class Department : NamedEntity
    {
        public virtual string Color { get; set; }
    }
}
