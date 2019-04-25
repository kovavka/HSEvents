using System.ComponentModel;
using Domain.IEntity;

namespace Domain
{
    public class User: Entity
    {
        public virtual string Login { get; set; }
        public virtual string Password { get; set; }
        public virtual UserType Type { get; set; }
    }

    public enum UserType
    {
        [Description("Участник")] Attendee = 1,
        [Description("Сотрудник")] Employee = 2,
        [Description("Администратор")] Admin = 3,
    }
}
