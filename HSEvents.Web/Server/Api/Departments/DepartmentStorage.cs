using System.Collections.Generic;
using System.Linq;
using Domain.Events;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.Departments
{
    public interface IDepartmentStorage
    {
        IEnumerable<Department> GetAll();
    }

    public class DepartmentStorage : IDepartmentStorage
    {
        public IEnumerable<Department> GetAll()
        {
            using (var repo = new NHGetAllRepository<Department>())
            {
                return repo.GetAll().AsEnumerable();
            }
        }
    }
}
