using System.Collections.Generic;
using System.Web.Http;
using Domain.Events;

namespace HSEvents.Server.Api.Departments
{
    [AllowAnonymous]
    public class DepartmentController : ApiController
    {
        private readonly IDepartmentService departmentService;
        public DepartmentController(IDepartmentService departmentService)
        {
            this.departmentService = departmentService;
        }

        [HttpGet]
        public IEnumerable<Department> GetAll()
        {
            return departmentService.GetAll();
        }

        [HttpGet]
        public Department Get(long id)
        {
            return departmentService.Get(id);
        }

        [HttpPut]
        public Department Add(Department subject)
        {
            return departmentService.Add(subject);
        }

        [HttpPut]
        public void Update(Department subject)
        {
            departmentService.Update(subject);
        }

        [HttpPost]
        public void Delete([FromBody] long id)
        {
            departmentService.Delete(id);
        }

        [HttpPost]
        public void DeleteSeveral([FromBody] long[] ids)
        {
            departmentService.Delete(ids);
        }
    }
}
