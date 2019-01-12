using System.Collections.Generic;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Cities
{
    public interface ICityService
    {
        IEnumerable<CityDto> GetAll();
    }

    public class CityService : ICityService
    {
        private readonly ICityStorage cityStorage;

        public CityService(ICityStorage cityStorage)
        {
            this.cityStorage = cityStorage;
        }
        
        public IEnumerable<CityDto> GetAll()
        {
           return cityStorage.GetAll();
        }
    }
}
