using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories.Dto;

namespace Infrastructure.Repositories
{
    public class AddressRepository : NHDtoRepository<Address, AddressDto>
    {
        public override IEnumerable<AddressDto> GetAllDtos()
        {
            return GetAll().AsEnumerable().Select(ConvertToDto);
        }

        protected override AddressDto ConvertToDto(Address entity)
        {
            return new AddressDto
            {
                Id = entity.Id,
                ShortName = entity.ToString(),
                Caption = entity.FullAddress,
                House = entity.House,
                Street = entity.Street,
            };
        }

        protected override Address ConvertToEntity(AddressDto dto)
        {
            return new Address()
            {
                Id = dto.Id,
                House = dto.House,
                Street = RepositoryHelper.GetAnotherEntity<Street>(dto.Street.Id),
            };
        }
    }

}
