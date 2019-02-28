using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories.Dto;

namespace Infrastructure.Repositories
{
    public class CityRepository : NHDtoRepository<City, CityDto>
    {
        public override IEnumerable<CityDto> GetAllDtos()
        {
            return GetAll().AsEnumerable().Select(ConvertToDto);
        }

        protected override CityDto ConvertToDto(City entity)
        {
            return new CityDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                CityTypeId = entity.CityType.Id,
                RegionId = entity.Region.Id
            };
        }

        protected override City ConvertToEntity(CityDto dto)
        {
            return new City()
            {

                Id = dto.Id,
                Name = dto.Name,
                CityType = RepositoryHelper.GetAnotherEntity<CityType>(dto.CityTypeId),
                Region = RepositoryHelper.GetAnotherEntity<Region>(dto.RegionId),
            };
        }
    }

}
