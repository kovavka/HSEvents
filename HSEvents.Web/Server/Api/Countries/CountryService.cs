using System.Collections.Generic;
using Domain;

namespace HSEvents.Server.Api.Countries
{
    public interface ICountryService
    {
        IEnumerable<Country> GetAll();
        Country Get(long id);
        Country Add(Country country);
        void Update(Country country);
        void Delete(long id);
        void Delete(long[] ids);
    }

    public class CountryService : ICountryService
    {
        private readonly ICountryStorage countryStorage;

        public CountryService(ICountryStorage countryStorage)
        {
            this.countryStorage = countryStorage;
        }
        
        public IEnumerable<Country> GetAll()
        {
           return countryStorage.GetAll();
        }
        public Country Get(long id)
        {
            return countryStorage.Get(id);
        }

        public Country Add(Country country)
        {
            return countryStorage.Add(country);
        }

        public void Update(Country country)
        {
            countryStorage.Update(country);
        }

        public void Delete(long id)
        {
            countryStorage.Delete(id);
        }

        public void Delete(long[] ids)
        {
            countryStorage.Delete(ids);
        }
    }
}
