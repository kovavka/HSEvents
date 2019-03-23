using System.Collections.Generic;
using Domain;

namespace HSEvents.Server.Api.CityTypes
{
    public interface ICityTypeService
    {
        IEnumerable<CityType> GetAll();
        CityType Get(long id);
        CityType Add(CityType type);
        void Update(CityType type);
        void Delete(long id);
        void Delete(long[] ids);
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

        public CityType Get(long id)
        {
            return cityTypeStorage.Get(id);
        }

        public CityType Add(CityType type)
        {
            return cityTypeStorage.Add(type);
        }

        public void Update(CityType type)
        {
            cityTypeStorage.Update(type);
        }

        public void Delete(long id)
        {
            cityTypeStorage.Delete(id);
        }

        public void Delete(long[] ids)
        {
            cityTypeStorage.Delete(ids);
        }
    }
}
