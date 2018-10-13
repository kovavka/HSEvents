using System.Collections.Generic;
using System.Web.Http;
using Domain.IEntity;

namespace HSEvents.Server.Api.Empty
{
    [AllowAnonymous]
    public class Controller : ApiController
    {
        private readonly IService Service;
        public Controller(IService Service)
        {
            this.Service = Service;
        }

        [HttpGet]
        public IEnumerable<Entity> GetAll()
        {
            return Service.GetAll();
        }
    }
}
