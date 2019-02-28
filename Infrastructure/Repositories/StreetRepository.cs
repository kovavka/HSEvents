using System.Linq;
using Domain;
using Infrastructure.Repositories.Dto;

namespace Infrastructure.Repositories
{
    public class StreetRepository : NHDtoRepository<Street, StreetDto>
    {
        protected override StreetDto ConvertToDto(Street entity)
        {
            return new StreetDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                CityId = entity.City.Id
            };
        }

        protected override Street ConvertToEntity(StreetDto dto)
        {
            //todo
            return new Street();
        }
    }

}
