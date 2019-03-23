using System.Collections.Generic;
using System.Linq;
using Domain.Events;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.Departments
{
    public interface IDepartmentStorage
    {
        IEnumerable<Department> GetAll();
        Department Get(long id);
        Department Add(Department subject);
        void Update(Department subject);
        void Delete(long id);
        void Delete(long[] ids);
    }

    public class DepartmentStorage : SimpleEntityStorage<Department>, IDepartmentStorage
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
