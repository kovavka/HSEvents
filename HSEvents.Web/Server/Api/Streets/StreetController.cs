using System.Collections.Generic;
using System.Web.Http;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Streets
{
    [AllowAnonymous]
    public class StreetController : ApiController
    {
        private readonly IStreetService streetService;
        public StreetController(IStreetService streetService)
        {
            this.streetService = streetService;
        }

        [HttpGet]
        public IEnumerable<StreetDto> GetAll()
        {
            return streetService.GetAll();
        }
    }
}
