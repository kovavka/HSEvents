using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Events;
using NHibernate;

namespace Infrastructure.Repositories
{
    public class EventRepository: IGetAllRepository<Event>
    {
        private readonly CourseRepository courseRepository;
        private readonly AcademicCompetitionRepository AcademicCompetitionRepository;
        private readonly SchoolWorkRepository schoolWorkRepository;

        public EventRepository()
        {
            courseRepository = new CourseRepository();
            AcademicCompetitionRepository = new AcademicCompetitionRepository();
            schoolWorkRepository = new SchoolWorkRepository();
        }

        public Event Get(int id)
        {
            var course = courseRepository.Get(id);
            if (course != null)
                return course;

            var AcademicCompetition = AcademicCompetitionRepository.Get(id);
            if (AcademicCompetition != null)
                return AcademicCompetition;

            return schoolWorkRepository.Get(id);
        }

        public IQueryable<Event> GetAll()
        {
            return new NHGetAllRepository<Event>().GetAll();
                
                //courseRepository.GetAll()
                //.OfType<Event>()
                //.Union(AcademicCompetitionRepository.GetAll())
                //.Union(schoolWorkRepository.GetAll());
        }

        public void Delete(Event entity)
        {
            //Todo: а надо ли вообще эти методы делать универсальными?

            if (entity == null)
                return;

            var course = entity as Course;
            if (course != null)
                courseRepository.Delete(course);

            var AcademicCompetition = entity as AcademicCompetition;
            if (AcademicCompetition != null)
                AcademicCompetitionRepository.Delete(AcademicCompetition);

            var courschoolWorkse = entity as SchoolWork;
            if (courschoolWorkse != null)
                schoolWorkRepository.Delete(courschoolWorkse);
        }

        public void Update(Event entity)
        {
            //ToDo
        }


        public void Delete(int id)
        {
            //ToDo
        }
        public object Add(Event entity)
        {
            //ToDo
            return 0;
        }

        public void Dispose()
        {
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
