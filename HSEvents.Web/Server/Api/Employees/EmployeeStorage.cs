using System.Collections.Generic;
using System.Linq;
using Domain.Events;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.Employees
{
    public interface IEmployeeStorage
    {
        IEnumerable<Employee> GetAll();
    }

    public class EmployeeStorage : IEmployeeStorage
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
