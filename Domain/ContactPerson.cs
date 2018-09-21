using Domain.IEntity;

namespace Domain
{
    public class ContactPerson: PersonEntity
    {
        public virtual string Appointment { get; set; }
    }
}
