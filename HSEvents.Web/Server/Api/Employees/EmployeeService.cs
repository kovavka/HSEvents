using System.Collections.Generic;
using Domain.Events;
using Helpers;
using Infrastructure;

namespace HSEvents.Server.Api.Employees
{
    public interface IEmployeeService
    {
        IEnumerable<Employee> GetAll();
        Employee Get(long id);
        Employee Add(Employee employee);
        void Update(Employee employee);
        void Delete(long id);
        void Delete(long[] ids);
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

        public Employee Add(Employee employee)
        {
            if (employee.User != null)
            {
                employee.User.Password = PasswordHelper.GetHash(employee.User.Password);
            }
            return employeeStorage.Add(employee);
        }

        public void Update(Employee employee)
        {
            if (employee.User != null)
            {
                if (employee.User.Password.IsNotEmpty())
                {
                    employee.User.Password = PasswordHelper.GetHash(employee.User.Password);
                }
                else
                {
                    var old = Get(employee.Id);
                    employee.User.Password = old.User?.Password;
                }
            }

            employeeStorage.Update(employee);
        }

        public void Delete(long id)
        {
            employeeStorage.Delete(id);
        }

        public void Delete(long[] ids)
        {
            employeeStorage.Delete(ids);
        }
    }
}
