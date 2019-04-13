using System.Collections.Generic;
using System.Linq;
using Domain;
using Helpers;
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

        public IEnumerable<CityDto> GetAllDtos(CityArgs args)
        {
            var query = GetAll();

            if (args.Region.IsNotEmpty())
                query = query.Where(x => x.Region.Name == args.Region);

            if (args.Type.IsNotEmpty())
                query = query.Where(x => x.CityType.Name == args.Type);

            return query.AsEnumerable().Select(ConvertToDto).ToList();
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

    public class CityArgs
    {
        public string Region { get; set; }
        public string Type { get; set; }
        public string Limit { get; set; }
        public string Offset { get; set; }
    }
}
