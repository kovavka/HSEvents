
namespace Domain.IEntity
{
    public interface IPersonEntiny: IEntity
    {
        ContactInfo ContactInfo { get; set; }
    }

    public class PersonEntity : Entity, IPersonEntiny
    {
        public virtual ContactInfo ContactInfo { get; set; }

        public PersonEntity()
        {
            ContactInfo =new ContactInfo();
        }
    }
  
}
