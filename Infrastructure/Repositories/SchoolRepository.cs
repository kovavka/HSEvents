using System.Linq;
using Domain;
using Infrastructure.Repositories.Dto;

namespace Infrastructure.Repositories
{
    public class SchoolRepository : NHDtoRepository<School, SchoolDto>
    {
        protected override SchoolDto ConvertToDto(School entity)
        {
            return new SchoolDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                Type = entity.Type,
                Number = entity.Number,
                BelongToUniversityDistrict = entity.BelongToUniversityDistrict,
                HasPriority = entity.HasPriority,
                //Addresses = entity.Addresses.Select(a => new AddressDto
                //{
                //    Id = a.Id,
                //    ShortName = a.ToString(),
                //    Caption = a.FullAddress
                //}).ToList(),
                //Contacts = entity.Contacts.ToList()
            };
        }

        protected override School ConvertToEntity(SchoolDto dto)
        {
            //todo
            return new School();
        }
    }

}
