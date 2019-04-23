using System.Collections.Generic;
using System.Web.Http;
using Infrastructure.Repositories;
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
        public IEnumerable<StreetDto> GetAll(StreetArgs args)
        {
            return streetService.GetAll(args);
        }

        [HttpGet]
        public StreetDto Get(long id)
        {
            return streetService.Get(id);
        }

        [HttpPut]
        public StreetDto Add(StreetDto subject)
        {
            return streetService.Add(subject);
        }

        [HttpPut]
        public void Update(StreetDto subject)
        {
            streetService.Update(subject);
        }

        [HttpPost]
        public void Delete([FromBody] long id)
        {
            streetService.Delete(id);
        }

        [HttpPost]
        public void DeleteSeveral([FromBody] long[] ids)
        {
            streetService.Delete(ids);
        }
    }
}
