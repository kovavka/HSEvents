using Domain.Events;

namespace Domain
{
    public class User: Employee
    {
        public virtual string Login { get; set; }
        public virtual string Password { get; set; }
        public virtual bool IsAdmin { get; set; }
        public virtual bool Checked { get; set; }
    }
}
