using System.Collections.Generic;
using Domain.Events;

namespace HSEvents.Server.Api.Employees
{
    public interface IEmployeeService
    {
        IEnumerable<Employee> GetAll();
        Employee Get(long id);
        Employee Add(Employee subject);
        void Update(Employee subject);
        void Delete(long id);
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

        public Employee Get(long id)
        {
            return employeeStorage.Get(id);
        }

        public Employee Add(Employee subject)
        {
            return employeeStorage.Add(subject);
        }

        public void Update(Employee subject)
        {
            employeeStorage.Update(subject);
        }

        public void Delete(long id)
        {
            employeeStorage.Delete(id);
        }
    }
}
