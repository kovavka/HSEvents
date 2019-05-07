
namespace Domain
{
    public class ContactInfo
    {
        public virtual string FullName { get; set; }
        public virtual string PhoneNumber { get; set; }
        public virtual string Email { get; set; }

        public ContactInfo() { }

        public ContactInfo(string fullName, string phoneNumber, string email)
        {
            FullName = fullName;
            PhoneNumber = phoneNumber;
            Email = email;
        }
    }
}
