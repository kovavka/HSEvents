using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.Countries
{
    public interface ICountryStorage
    {
        IEnumerable<Country> GetAll();
        Country Get(long id);
        Country Add(Country country);
        void Update(Country country);
        void Delete(long id);
    }

    public class CountryStorage : SimpleEntityStorage<Country>, ICountryStorage
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
