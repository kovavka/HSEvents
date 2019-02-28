using System.Collections.Generic;
using System.Web.Http;
using Domain;
using Domain.IEntity;

namespace HSEvents.Server.Api.Regions
{
    [AllowAnonymous]
    public class RegionController : ApiController
    {
        private readonly IRegionService regionService;
        public RegionController(IRegionService regionService)
        {
            this.regionService = regionService;
        }

        [HttpGet]
        public IEnumerable<Region> GetAll()
        {
            return regionService.GetAll();
        }

        [HttpGet]
        public Region Get(long id)
        {
            return regionService.Get(id);
        }

        [HttpPut]
        public Region Add(Region subject)
        {
            return regionService.Add(subject);
        }

        [HttpPut]
        public void Update(Region subject)
        {
            regionService.Update(subject);
        }

        [HttpPost]
        public void Delete([FromBody] long id)
        {
            regionService.Delete(id);
        }
    }
}
