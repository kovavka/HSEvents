using System.Collections.Generic;
using System.Web.Http;
using Domain;

namespace HSEvents.Server.Api.Countries
{
    [AllowAnonymous]
    public class CountryController : ApiController
    {
        private readonly ICountryService countryService;
        public CountryController(ICountryService countryService)
        {
            this.countryService = countryService;
        }

        [HttpGet]
        public IEnumerable<Country> GetAll()
        {
            return countryService.GetAll();
        }

        [HttpGet]
        public Country Get(long id)
        {
            return countryService.Get(id);
        }

        [HttpPut]
        public Country Add(Country country)
        {
            return countryService.Add(country);
        }

        [HttpPut]
        public void Update(Country country)
        {
            countryService.Update(country);
        }

        [HttpPost]
        public void Delete([FromBody]long id)
        {
            countryService.Delete(id);
        }

        [HttpPost]
        public void DeleteSeveral([FromBody] long[] ids)
        {
            countryService.Delete(ids);
        }
    }
}
