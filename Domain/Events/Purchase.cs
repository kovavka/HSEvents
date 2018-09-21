using Domain.IEntity;

namespace Domain.Events
{
    public class Purchase : Entity
    {
        public virtual decimal Price { get; set; }
        public virtual string Description { get; set; }
    }
}
