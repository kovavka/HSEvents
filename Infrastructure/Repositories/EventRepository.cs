using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Domain;
using Domain.Events;
using Helpers;
using Infrastructure.Repositories.Dto;
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

        public void Delete(long id)
        {
            using (var repo = new NHGetAllRepository<EventExecution>())
            {
                repo.Delete(x => x.Event.Id == id);
            }

            base.Delete(id);
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
            DropExecutions();
            DropPurchases();
        }

        private void DropExecutions()
        {
            using (var repo = new NHGetAllRepository<EventExecution>())
            {
                repo.Delete(x => x.Event == null);
            }
        }
        private void DropPurchases()
        {
            using (var repo = new NHGetAllRepository<Purchase>())
            {
                repo.Delete(x => x.Event == null);
            }
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
                Departments = entity.Departments.ToList(),
                Volunteers = entity.Volunteers.ToList(),
                Lecturers = entity.Lecturers.ToList(),
                Organizers = entity.Organizers.ToList(),
                Purchases = entity.Purchases.ToList()
            };
        }

        private Event ConvertToEntity(EventDto dto)
        {
            Event entity;
            switch (dto.Type)
            {
                case EventType.Course:
                    entity = new Course()
                    {
                        Subject = RepositoryHelper.GetAnotherEntity<Subject>(dto.Subject.Id),
                        Duration = dto.Duration,
                        Price = dto.Price
                    };
                    break;
                case EventType.AcademicCompetition:
                    entity = new AcademicCompetition()
                    {
                        Subject = RepositoryHelper.GetAnotherEntity<Subject>(dto.Subject.Id)
                    };
                    break;
                default:
                    entity = new SchoolWork()
                    {
                        Program = dto.Program
                    };
                    break;
            }

            entity.Id = dto.Id;
            entity.Name = dto.Name;
            entity.Type = dto.Type;
            entity.Info = dto.Info;
            entity.Comment = dto.Comment;
            entity.Departments = RepositoryHelper.GetAnotherEntity<Department>(dto.Departments.Select(x=>x.Id)).ToSet();
            entity.Volunteers = RepositoryHelper.GetAnotherEntity<Volunteer>(dto.Volunteers.Select(x=>x.Id)).ToList();
            entity.Lecturers = RepositoryHelper.GetAnotherEntity<Employee>(dto.Lecturers.Select(x=>x.Id)).ToList();
            entity.Organizers = RepositoryHelper.GetAnotherEntity<Employee>(dto.Organizers.Select(x=>x.Id)).ToList();
            entity.Purchases = dto.Purchases;

            entity.EventExecutions = dto.Executions.Select(x => new EventExecution()
                {
                    Dates = x.Dates.Select(xx => new EventDate()
                    {
                        Date = xx.Date,
                        StartTime = GetTimeSpan(xx.StartTime),
                        EndTime = GetTimeSpan(xx.EndTime)
                    }).ToList(),
                Address = RepositoryHelper.GetAnotherEntity<Address>(x.Address.Id)
            }
            ).ToSet();

            if (dto.Id != 0)
            {
                var lastVersion = RepositoryHelper.GetAnotherEntity<Event>(dto.Id);
                entity.AttendanceInfo = lastVersion.AttendanceInfo;
            }

            return entity;
        }
        
        private string GetTimeString(TimeSpan? time)
        {
            if (!time.HasValue)
                return string.Empty;

            return time.Value.ToString(@"hh\:mm");
        }
        private TimeSpan? GetTimeSpan(string time)
        {
            var regex = new Regex(@"^\d\d:\d\d$");

            if (time.IsNullOrEmpty() || !regex.IsMatch(time))
                return null;

            var hours = int.Parse(time.Split(':')[0]);
            var minutes = int.Parse(time.Split(':')[1]);

            return new TimeSpan(hours, minutes, 0);
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
