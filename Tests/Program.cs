using Domain.Events;
using Infrastructure;
using Infrastructure.Repositories;

namespace Tests
{
    class Program
    {
        static void Main(string[] args)
        {
            NHibernateHelper.Configure();

            using (var repo = new NHGetAllRepository<EventExecution>())
            {
                repo.Delete(x => x.Event == null);
            }
        }
    }
}
