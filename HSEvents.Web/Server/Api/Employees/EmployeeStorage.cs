using System.Collections.Generic;
using System.Linq;
using Domain.Events;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.Employees
{
    public interface IEmployeeStorage
    {
        IEnumerable<Employee> GetAll();
        Employee Get(long id);
        Employee Add(Employee employee);
        void Update(Employee employee);
        void Delete(long id);
        void Delete(long[] ids);
    }

    public class EmployeeStorage : SimpleEntityStorage<Employee>, IEmployeeStorage
    {
        public IEnumerable<Employee> GetAll()
        {
            using (var repo = new EmployeeRepository())
            {
                return repo.GetAll().AsEnumerable();
            }
        }

        public Employee Get(long id)
        {
            using (var repo = new EmployeeRepository())
            {
                return repo.Get(id);
            }
        }
    }
}
