using System.Collections.Generic;
using System.Web.Http;
using Domain.Events;
using HSEvents.Server.Auth;

namespace HSEvents.Server.Api.Employees
{
    //[Auth]
    public class EmployeeController : ApiController
    {
        private readonly IEmployeeService employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            this.employeeService = employeeService;
        }

        [HttpGet]
        public IEnumerable<Employee> GetAll()
        {
            return employeeService.GetAll();
        }
        
        [HttpGet]
        public Employee Get(long id)
        {
            return employeeService.Get(id);
        }

        [HttpPut]
        public Employee Add(Employee employee)
        {
            return employeeService.Add(employee);
        }

        [HttpPut]
        public void Update(Employee employee)
        {
            employeeService.Update(employee);
        }

        [HttpPost]
        public void Delete([FromBody] long id)
        {
            employeeService.Delete(id);
        }

    }
}
