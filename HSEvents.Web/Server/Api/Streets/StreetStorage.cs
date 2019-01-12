using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Streets
{
    public interface IStreetStorage
    {
        IEnumerable<StreetDto> GetAll();
    }

    public class StreetStorage : IStreetStorage
    {
        public IEnumerable<StreetDto> GetAll()
        {
            using (var repo = new NHGetAllRepository<Street>())
            {
                return repo.GetAll()
                    .AsEnumerable()
                    .Select(x => new StreetDto()
                    {
                        Id = x.Id,
                        Name = x.Name,
                        CityId = x.City.Id
                    });
            }
        }
    }
}
