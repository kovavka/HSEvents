using System.Data;
using System.Linq;
using Domain.Events;
using NHibernate.Linq;

namespace Infrastructure.Repositories
{
    public class EmployeeRepository : NHGetAllRepository<Employee>
    {
        public IQueryable<Employee> GetAll()
        {
            IQueryable<Employee> result;
            using (var tx = session.BeginTransaction(IsolationLevel.ReadCommitted))
            {
                result = session.Query<Employee>().Fetch(x=>x.User);
                tx.Commit();
            }

            return result;
        }

        public Employee Get(long id)
        {
            return session.Query<Employee>().Where(x => x.Id == id).Fetch(x => x.User).FirstOrDefault();
        }
    }

}
