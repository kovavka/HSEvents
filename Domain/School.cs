using System.Collections.Generic;
using Domain.IEntity;

namespace Domain
{
    public class School: NamedEntity
    {
        public virtual SchoolType Type { get; set; }
        public virtual int? Number { get; set; }
        public virtual bool BelongToUniversityDistrict { get; set; }
        public virtual bool HasPriority { get; set; }
        public virtual ICollection<Address> Addresses { get; set; }
        public virtual ICollection<ContactPerson> Contacts { get; set; }
        public override string ToString()
        {
            return Name;
        }
    }

    public class SchoolType : NamedEntity
    {
    }
}
