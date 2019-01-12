using System.Collections.Generic;
using System.Web.Http;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Cities
{
    [AllowAnonymous]
    public class CityController : ApiController
    {
        private readonly ICityService cityService;
        public CityController(ICityService cityService)
        {
            this.cityService = cityService;
        }

        [HttpGet]
        public IEnumerable<CityDto> GetAll()
        {
            return cityService.GetAll();
        }
    }
}
