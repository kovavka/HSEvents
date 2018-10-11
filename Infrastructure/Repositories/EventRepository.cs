using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Domain.Events;
using FluentNHibernate.Utils;
using Helpers;
using Infrastructure.Repositories.Dto;
using NHibernate;
using NHibernate.Linq;

namespace Infrastructure.Repositories
{
    public class EventRepository: NHGetAllRepository<Event>
    {
        private Regex TimeRegex=new Regex(@"\d\d:\d\d");
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
            var comp = entity as AcademicCompetition;
            var work = entity as SchoolWork;
            var course = entity as Course;

            return new EventDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                Type = entity.Type,
                Info = entity.Info,
                Comment = entity.Comment,
                Executions = entity.EventExecutions
                    .Select(x =>
                        new EventExecutionDto
                        {
                            Id = x.Id,
                            Dates = x.Dates.Select(xx => new EventDateDto
                                {
                                    Date = xx.Date,
                                    StartTime = GetTimeString(xx.StartTime),
                                    EndTime = GetTimeString(xx.EndTime)
                                })
                                .ToList(),
                            Address = new AddressDto
                            {
                                Id = x.Address.Id,
                                ShortName = x.Address.ToString(),
                                Caption = x.Address.FullAddress
                            },
                        })
                    .ToList(),
                Subject = course?.Subject ?? comp?.Subject,
                Duration = course?.Duration,
                Price = course?.Price,
                Program = work?.Program,
            };
        }

        private string GetTimeString(TimeSpan? time)
        {
            if (!time.HasValue || !TimeRegex.IsMatch(time.ToString()))
                return string.Empty;

            return TimeRegex.Match(time.ToString()).Groups[0].Value;
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
            entity.Name = dto.Name;
            entity.Type = dto.Type;
            entity.Info = dto.Info;
            entity.Comment = dto.Comment;

            entity.EventExecutions = dto.Executions.Select(x => new EventExecution()
                {

                }
            ).ToSet();
            entity.Type = dto.Type;
            entity.Type = dto.Type;
            entity.Type = dto.Type;
            entity.Type = dto.Type;
            var t = new Class1();

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
