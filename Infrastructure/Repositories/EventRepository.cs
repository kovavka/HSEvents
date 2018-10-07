using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Events;
using FluentNHibernate.Utils;
using Infrastructure.Repositories.Dto;
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

        public EventDto GetDto(int id)
        {
            return ConvertToDto(Get(id));
        }

         public EventDto Add(EventDto dto)
        {
            var entity = ConvertToEntity(dto);
            return ConvertToDto(Add(entity));
        }
        
        public void Update(EventDto dto)
        {
            var entity = ConvertToEntity(dto);
            Update(entity);
        }

        private EventDto ConvertToDto(Event entity)
        {
            return new EventDto()
            {
                Id = entity.Id,
                Info = entity.Info,
                Name = entity.Name,
                Type = entity.Type,
                Executions = entity.EventExecutions
                    .Select(x =>
                        new EventExecutionDto
                        {
                            Id = x.Id,
                            Dates = x.Dates.ToList(),
                            Address = new AddressDto
                            {
                                Id = x.Address.Id,
                                ShortName = x.Address.ToString(),
                                Caption = x.Address.FullAddress
                            }
                        }).ToList()
            };
        }

        private Event ConvertToEntity(EventDto dto)
        {
            Event entity;
            switch (dto.Type)
            {
                case EventType.Course:
                    entity = new Course();
                    break;
                case EventType.AcademicCompetition:
                    entity = new AcademicCompetition();
                    break;
                case EventType.SchoolWork:
                    entity = new SchoolWork();
                    break;
                default:
                    entity = new Course();
                    break;
            }

            entity.Id = dto.Id;
            entity.Info = dto.Info;
            entity.Name = dto.Name;
            entity.Type = dto.Type;

            return entity;
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
