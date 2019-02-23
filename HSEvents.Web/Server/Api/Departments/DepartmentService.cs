using System.Collections.Generic;
using Domain.Events;

namespace HSEvents.Server.Api.Departments
{
    public interface IDepartmentService
    {
        IEnumerable<Department> GetAll();
        Department Get(long id);
        Department Add(Department entity);
        void Update(Department entity);
        void Delete(long id);
    }

    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentStorage departmentStorage;

        public DepartmentService(IDepartmentStorage departmentStorage)
        {
            this.departmentStorage = departmentStorage;
        }
        
        public IEnumerable<Department> GetAll()
        {
           return departmentStorage.GetAll();
        }

        public Department Get(long id)
        {
            return departmentStorage.Get(id);
        }

        public Department Add(Department subject)
        {
            return departmentStorage.Add(subject);
        }

        public void Update(Department subject)
        {
            departmentStorage.Update(subject);
        }

        public void Delete(long id)
        {
            departmentStorage.Delete(id);
        }
    }
}
