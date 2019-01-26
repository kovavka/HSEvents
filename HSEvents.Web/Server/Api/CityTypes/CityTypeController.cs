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
        
        [HttpGet]
        public CityType Get(long id)
        {
            return cityTypeService.Get(id);
        }

        [HttpPut]
        public CityType Add(CityType type)
        {
            return cityTypeService.Add(type);
        }

        [HttpPut]
        public void Update(CityType type)
        {
            cityTypeService.Update(type);
        }

        [HttpPost]
        public void Delete([FromBody] long id)
        {
            cityTypeService.Delete(id);
        }
    }
}
