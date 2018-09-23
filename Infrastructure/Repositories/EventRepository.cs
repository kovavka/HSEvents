using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Events;
using NHibernate;
using NHibernate.Linq;

namespace Infrastructure.Repositories
{
    public class EventRepository: NHGetAllRepository<Event>
    {
        public IEnumerable<Event> GetForMonth(DateTime fromDate, DateTime toDate)
        {
            return GetAll()
                .FetchMany(x => x.Departments)
                .FetchMany(x => x.EventExecutions)
                .Where(x => x.EventExecutions.Any(xx => xx.Dates.Any(d => d.Date >= fromDate && d.Date <= toDate)));
        }
    }

    public class CourseRepository : NHRepository<Course>
    {
    }
    public class AcademicCompetitionRepository : NHRepository<AcademicCompetition>
    {
    }
    public class SchoolWorkRepository : NHRepository<SchoolWork>
    {
    }
}
