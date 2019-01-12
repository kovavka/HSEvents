using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories.Dto;

namespace Infrastructure.Repositories
{
    public class SchoolRepository : NHGetAllRepository<School>
    {
         public SchoolDto Add(SchoolDto dto)
        {
            var entity = ConvertToEntity(dto);
            return ConvertToDto(Add(entity));
        }

        public IEnumerable<SchoolDto> GetAllDtos()
        {
            return GetAll()
                .AsEnumerable()
                .Select(ConvertToDto);
        }
        
        public void Update(SchoolDto dto)
        {
            var entity = ConvertToEntity(dto);
            Update(entity);
        }

        private SchoolDto ConvertToDto(School entity)
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

        private School ConvertToEntity(SchoolDto dto)
        {
            //todo
            return new School();
        }


    }

}
