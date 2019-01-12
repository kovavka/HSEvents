using System.Collections.Generic;
using System.Web.Http;
using Domain;

namespace HSEvents.Server.Api.CityTypes
{
    [AllowAnonymous]
    public class CityTypeController : ApiController
    {
        private readonly ICityTypeService cityTypeService;
        public CityTypeController(ICityTypeService cityTypeService)
        {
            this.cityTypeService = cityTypeService;
        }

        [HttpGet]
        public IEnumerable<CityType> GetAll()
        {
            return cityTypeService.GetAll();
        }
    }
}
