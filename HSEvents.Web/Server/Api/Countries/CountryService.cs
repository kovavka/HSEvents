using System.Collections.Generic;
using Domain;

namespace HSEvents.Server.Api.Countries
{
    public interface ICountryService
    {
        IEnumerable<Country> GetAll();
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
    }
}
