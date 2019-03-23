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
        Employee Add(Employee subject);
        void Update(Employee subject);
        void Delete(long id);
        void Delete(long[] ids);
    }

    public class EmployeeStorage : SimpleEntityStorage<Employee>, IEmployeeStorage
    {
        public IEnumerable<Employee> GetAll()
        {
            using (var repo = new NHGetAllRepository<Employee>())
            {
                return repo.GetAll().AsEnumerable();
            }
        }
    }
}
