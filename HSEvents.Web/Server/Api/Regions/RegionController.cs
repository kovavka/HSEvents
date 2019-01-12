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
    }
}
