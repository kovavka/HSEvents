using System.Collections.Generic;
using Domain;

namespace HSEvents.Server.Api.CityTypes
{
    public interface ICityTypeService
    {
        IEnumerable<CityType> GetAll();
    }

    public class CityTypeService : ICityTypeService
    {
        private readonly ICityTypeStorage cityTypeStorage;

        public CityTypeService(ICityTypeStorage cityTypeStorage)
        {
            this.cityTypeStorage = cityTypeStorage;
        }
        
        public IEnumerable<CityType> GetAll()
        {
           return cityTypeStorage.GetAll();
        }
    }
}
