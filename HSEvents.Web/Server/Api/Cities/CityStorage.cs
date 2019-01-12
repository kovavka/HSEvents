using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Cities
{
    public interface ICityStorage
    {
        IEnumerable<CityDto> GetAll();
    }

    public class CityStorage : ICityStorage
    {
        public IEnumerable<CityDto> GetAll()
        {
            using (var repo = new NHGetAllRepository<City>())
            {
                return repo.GetAll()
                    .AsEnumerable()
                    .Select(x => new CityDto()
                    {
                        Id = x.Id,
                        Name = x.Name,
                        CityTypeId = x.CityType.Id,
                        RegionId = x.Region.Id
                    });
            }
        }
    }
}
