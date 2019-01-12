using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.Countries
{
    public interface ICountryStorage
    {
        IEnumerable<Country> GetAll();
    }

    public class CountryStorage : ICountryStorage
    {
        public IEnumerable<Country> GetAll()
        {
            using (var repo = new NHGetAllRepository<Country>())
            {
                return repo.GetAll().AsEnumerable();
            }
        }
    }
}
