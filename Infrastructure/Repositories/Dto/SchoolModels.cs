
using System.Collections.Generic;
using Domain;

namespace Infrastructure.Repositories.Dto
{
    public class SchoolDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public SchoolType Type { get; set; }
        public  int? Number { get; set; }
        public bool BelongToUniversityDistrict { get; set; }
        public bool HasPriority { get; set; }
        public List<AddressDto> Address { get; set; }
        public List<ContactPerson> Contacts { get; set; }
    }

}