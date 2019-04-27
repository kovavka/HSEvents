using System.Collections.Generic;
using System.Linq;
using Domain;
using Helpers;
using Infrastructure.Repositories.Dto;
using NHibernate.Linq;

namespace Infrastructure.Repositories
{
    public class StreetRepository : NHDtoRepository<Street, StreetDto>
    {
        public override IEnumerable<StreetDto> GetAllDtos()
        {
            return GetAll().AsEnumerable().Select(ConvertToDto);
        }

        public IEnumerable<StreetDto> GetAllDtos(StreetArgs args)
        {
            var query = GetAll();

            if (args.CityId.HasValue)
                query = query.Where(x => x.City.Id == args.CityId.Value);

            return query.AsEnumerable().Select(ConvertToDto).ToList();
        }

        protected override IQueryable<Street> GetAllQuery()
        {
            var query = base.GetAllQuery()
                .Fetch(x => x.City).ThenFetch(x => x.CityType)
                .Fetch(x => x.City).ThenFetch(x => x.Region).ThenFetch(x => x.Country);
            return query;
        }

        protected override StreetDto ConvertToDto(Street entity)
        {
            return new StreetDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                City = entity.City,
                AreaName = $"{entity.City.Region.Country.Name}, {entity.City.Region.Name}, {entity.City.CityType.ShortName}. {entity.City.Name}"
            };
        }

        protected override Street ConvertToEntity(StreetDto dto)
        {
            return new Street()
            {
                Id = dto.Id,
                Name = dto.Name,
                City = RepositoryHelper.GetAnotherEntity<City>(dto.City.Id)
            };
        }
    }
    
    public class StreetArgs
    {
        public long? CityId { get; set; }
        public string Limit { get; set; }
        public string Offset { get; set; }
    }
}
