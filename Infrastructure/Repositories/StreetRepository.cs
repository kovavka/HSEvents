using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories.Dto;

namespace Infrastructure.Repositories
{
    public class StreetRepository : NHDtoRepository<Street, StreetDto>
    {
        public override IEnumerable<StreetDto> GetAllDtos()
        {
            return GetAll().AsEnumerable().Select(ConvertToDto);
        }

        protected override StreetDto ConvertToDto(Street entity)
        {
            return new StreetDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                CityId = entity.City.Id,
                AreaName = $"{entity.City.Region.Country.Name}, {entity.City.Region.Name}, {entity.City.CityType.ShortName}. {entity.City.Name}"
            };
        }

        protected override Street ConvertToEntity(StreetDto dto)
        {
            return new Street()
            {
                Id = dto.Id,
                Name = dto.Name,
                City = RepositoryHelper.GetAnotherEntity<City>(dto.CityId)
            };
        }
    }

}
