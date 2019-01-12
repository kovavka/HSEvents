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
    }
}
