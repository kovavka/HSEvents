using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories.Dto;
using NHibernate.Linq;

namespace Infrastructure.Repositories
{
    public class SchoolRepository : NHDtoRepository<School, SchoolDto>
    {
        public override IEnumerable<SchoolDto> GetAllDtos()
        {
            return GetAll().Fetch(x => x.Type).AsEnumerable().Select(ConvertToDto);
        }

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
                Addresses = entity.Addresses.Select(a => new AddressDto
                {
                    Id = a.Id,
                    ShortName = a.ToString(),
                    Caption = a.FullAddress
                }).ToList(),
                Contacts = entity.Contacts.ToList()
            };
        }

        protected override School ConvertToEntity(SchoolDto dto)
        {
            return new School()
            {
                Id = dto.Id,
                Name = dto.Name,
                Type = RepositoryHelper.GetAnotherEntity(dto.Type),
                Number = dto.Number,
                BelongToUniversityDistrict = dto.BelongToUniversityDistrict,
                HasPriority = dto.HasPriority,
                Addresses = RepositoryHelper.GetAnotherEntity<Address>(dto.Addresses.Select(x => x.Id)).ToList(),
                Contacts = RepositoryHelper.GetAnotherEntity<ContactPerson>(dto.Contacts.Select(x => x.Id)).ToList()
            };
        }
    }

}
