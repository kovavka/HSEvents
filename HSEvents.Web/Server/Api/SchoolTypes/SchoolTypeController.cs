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

        [HttpGet]
        public SchoolType Get(long id)
        {
            return schoolTypeService.Get(id);
        }

        [HttpPut]
        public SchoolType Add(SchoolType type)
        {
            return schoolTypeService.Add(type);
        }

        [HttpPut]
        public void Update(SchoolType type)
        {
            schoolTypeService.Update(type);
        }

        [HttpPost]
        public void Delete([FromBody] long id)
        {
            schoolTypeService.Delete(id);
        }

        [HttpPost]
        public void DeleteSeveral([FromBody] long[] ids)
        {
            schoolTypeService.Delete(ids);
        }
    }
}
