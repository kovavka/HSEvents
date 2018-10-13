using System.Collections.Generic;
using Domain.Events;

namespace HSEvents.Server.Api.Departments
{
    public interface IDepartmentService
    {
        IEnumerable<Department> GetAll();
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
    }
}
