using System.Collections.Generic;
using System.Web.Http;
using Infrastructure.Repositories;
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
        public IEnumerable<CityDto> GetAll([FromUri] CityArgs args)
        {
            return cityService.GetAll(args);
        }

        [HttpGet]
        public CityDto Get(long id)
        {
            return cityService.Get(id);
        }

        [HttpPut]
        public CityDto Add(CityDto subject)
        {
            return cityService.Add(subject);
        }

        [HttpPut]
        public void Update(CityDto subject)
        {
            cityService.Update(subject);
        }

        [HttpPost]
        public void Delete([FromBody] long id)
        {
            cityService.Delete(id);
        }

        [HttpPost]
        public void DeleteSeveral([FromBody] long[] ids)
        {
            cityService.Delete(ids);
        }
    }
}
