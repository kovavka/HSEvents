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
    }
}
