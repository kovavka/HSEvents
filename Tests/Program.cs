using System;
using Domain.Events;
using Infrastructure;
using Infrastructure.Repositories;
using Tests.CreateAttendees;

namespace Tests
{
    class Program
    {
        static void Main(string[] args)
        {
            NHibernateHelper.Configure("Data Source=(local);Initial Catalog=HSEvents;Integrated Security=True;");
           
            using (var session = NHibernateHelper.OpenSession())
            {
                new AttendeesCreator().Run(session);
            }
                


            using (var repo = new NHGetAllRepository<EventExecution>())
            {
                repo.Delete(x => x.Event == null);
            }
        }
    }
}
