using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Cities
{
    public interface ICityStorage
    {
        IEnumerable<CityDto> GetAllDtos();
        CityDto Get(long id);
        CityDto Add(CityDto subject);
        void Update(CityDto subject);
        void Delete(long id);
        void Delete(long[] ids);
    }

    public class CityStorage : DtoStorage<City, CityDto, CityRepository>, ICityStorage
    {
    }
}
