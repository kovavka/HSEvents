using System.Collections.Generic;
using System.Web.Http;
using Domain;

namespace HSEvents.Server.Api.SchoolTypes
{
    [AllowAnonymous]
    public class SchoolTypeController : ApiController
    {
        private readonly ISchoolTypeService schoolTypeService;
        public SchoolTypeController(ISchoolTypeService schoolTypeService)
        {
            this.schoolTypeService = schoolTypeService;
        }

        [HttpGet]
        public IEnumerable<SchoolType> GetAll()
        {
            return schoolTypeService.GetAll();
        }
    }
}
