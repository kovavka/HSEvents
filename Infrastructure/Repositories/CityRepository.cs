using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories.Dto;
using NHibernate.Linq;

namespace Infrastructure.Repositories
{
    public class CityRepository : NHDtoRepository<City, CityDto>
    {
        public override IEnumerable<CityDto> GetAllDtos()
        {
            return GetAll().AsEnumerable().Select(ConvertToDto);
        }

        protected override IQueryable<City> GetAllQuery()
        {
            var query = base.GetAllQuery()
                .Fetch(x => x.CityType)
                .Fetch(x => x.Region).ThenFetch(x => x.Country);
            return query;
        }

        protected override CityDto ConvertToDto(City entity)
        {
            return new CityDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                CityType = entity.CityType,
                Region = entity.Region,
                AreaName = $"{entity.Region.Country.Name}, {entity.Region.Name}"
            };
        }

        protected override City ConvertToEntity(CityDto dto)
        {
            return new City()
            {
                Id = dto.Id,
                Name = dto.Name,
                CityType = RepositoryHelper.GetAnotherEntity<CityType>(dto.CityType.Id),
                Region = RepositoryHelper.GetAnotherEntity<Region>(dto.Region.Id)
            };
        }
    }

}
