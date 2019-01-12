using System.Collections.Generic;
using System.Web.Http;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Schools
{
    [AllowAnonymous]
    public class SchoolController : ApiController
    {
        private readonly ISchoolService schoolService;
        public SchoolController(ISchoolService schoolService)
        {
            this.schoolService = schoolService;
        }

        [HttpGet]
        public IEnumerable<SchoolDto> GetAll()
        {
            return schoolService.GetAll();
        }
    }
}
