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
    }
}
