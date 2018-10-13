using System.Collections.Generic;
using Domain.Events;

namespace HSEvents.Server.Api.Employees
{
    public interface IEmployeeService
    {
        IEnumerable<Employee> GetAll();
    }

    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeStorage employeeStorage;

        public EmployeeService(IEmployeeStorage employeeStorage)
        {
            this.employeeStorage = employeeStorage;
        }
        
        public IEnumerable<Employee> GetAll()
        {
           return employeeStorage.GetAll();
        }
    }
}
