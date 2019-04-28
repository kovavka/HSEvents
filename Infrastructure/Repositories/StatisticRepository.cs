using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Events;
using NHibernate;
using NHibernate.Linq;

namespace Infrastructure.Repositories
{
    public class StatisticRepository : IDisposable
    {
        private ISession session = NHibernateHelper.OpenSession();

        public IEnumerable<object> GetCostStats()
        {
            var query = session.CreateSQLQuery(@"select a.Year, Sum(Purchase.Price), AttendeeCount, StudentsCount from 
(SELECT Event.Id, Event.Year,  Count(*) AttendeeCount, Count(Pupil.EnterProgram_Id) StudentsCount
  FROM AttendanceInfo
  inner join Event on Event.Id=AttendanceInfo.Event_Id
  inner join Pupil on Pupil.Attendee_Id=AttendanceInfo.Attendee_Id
  where Participated=1
  group by Event.Id, Event.Year
  ) a
  inner join Purchase on Purchase.Event_Id=a.Id  
  group by a.Id, a.Year, AttendeeCount, StudentsCount").List();

            var list = query.Cast<Array>()
                .GroupBy(x => x.GetValue(0)) //by year
                .Select(x => new
                {
                    Year = x.Key,
                    Value = x.Select(v => new
                        {
                            Sum = v.GetValue(1),
                            Percent =
                                Math.Round((int) v.GetValue(3) *1.0 / (int) v.GetValue(2) * 100,
                                    MidpointRounding.AwayFromZero)
                        })
                        .OrderBy(v => v.Sum)
                })
                .OrderByDescending(x => x.Year)
                .ToList();

            return list;

        }

        public IEnumerable<object> GetSeasonStats()
        {
            var events = session.Query<Event>().Where(x => x.AttendanceInfo.Any(a => a.Participated) && x.Year!=0).ToList();
            var ids = events.Select(x => x.Id).ToList();
            session.Query<Event>().Where(x => ids.Contains(x.Id)).Fetch(x => x.AttendanceInfo);
            session.Query<Event>().Where(x => ids.Contains(x.Id)).FetchMany(x => x.EventExecutions).ThenFetch(x=>x.Dates);

            var data = events
                .Select(x => new
                {
                    Event = x,
                    AttendeeCount = x.AttendanceInfo.Count(a => a.Participated)
                })
                .GroupBy(x => x.Event.Year)
                .Select(x => new
                {
                    Year = x.Key,
                    Value = GetSeasons(x)
                })
                .OrderByDescending(x => x.Year)
                .ToList();


            return data;
        }

        public IEnumerable<object> GetEventsCountStats()
        {
            var query = session.CreateSQLQuery(@"SELECT  [YearOfGraduation], Count(*)
  FROM [HSEvents].[dbo].[AttendanceInfo]
  inner join [HSEvents].[dbo].[Pupil] on [Pupil].[Attendee_Id]=[AttendanceInfo].[Attendee_Id]
  where [EnterProgram_Id] is not null  and [Participated]=1 
  group by [Pupil].[Attendee_Id], [YearOfGraduation]").List();

            var list = query.Cast<Array>()
                .GroupBy(x => x.GetValue(0)) //by year
                .Select(x => new
                {
                    Year = x.Key,
                    Value = x.GroupBy(v => v.GetValue(1)) //by events count
                        .Select(v => new
                        {
                            EventsCount = v.Key,
                            AttendeesCount = v.Count()
                        })
                        .OrderBy(v => v.EventsCount)
                })
                .OrderByDescending(x => x.Year)
                .ToList();

            return list;
        }

        public IEnumerable<object> GetCompetitionStats()
        {
            var query = session.CreateSQLQuery(@"SELECT Event.Year, Subject.Name, NumberOfPoints, EnterProgram_Id FROM Result
  inner join AcademicCompetition on AcademicCompetition.Event_Id=Result.AcademicCompetition_Id
  inner join Event on Event.Id=AcademicCompetition.Event_Id
  inner join Pupil on Pupil.Attendee_Id=Result.Pupil_Id
  inner join Subject on Subject.Id=AcademicCompetition.Subject_Id").List();

            var list = query.Cast<Array>()
                .GroupBy(x => x.GetValue(0)) //by year
                .Select(x => new
                {
                    Year = x.Key,
                    Value = x.GroupBy(v => v.GetValue(1)) //by subject
                        .Select(v => new
                        {
                            Subject = v.Key,
                            Value = GetCompetitionPercents(v)
                        }).ToList()
                })
                .OrderByDescending(x => x.Year)
                .ToList();

            return list;
        }

        public IEnumerable<object> GetExamStats()
        {
            //вот это очень плохое решение, надо нормально оформить хотя бы (как и то, что выше)
          var query =  session.CreateSQLQuery(@"SELECT [Exam].[Year], [Subject].[Name], [NumberOfPoints] 
FROM [HSEvents].[dbo].[AttendanceInfo]
inner join [HSEvents].[dbo].[Course] on [Course].[Event_Id]=[AttendanceInfo].[Event_Id]
inner join [HSEvents].[dbo].[Event] on [Event].[Id]=[AttendanceInfo].[Event_Id]
inner join [HSEvents].[dbo].[Exam] on ([Exam].[Pupil_Id]=[AttendanceInfo].[Attendee_Id] and [Exam].[Subject_Id]=[Course].[Subject_Id] and [Exam].[Year]=[Event].[Year])
inner join [HSEvents].[dbo].[Subject] on [Subject].Id=[Course].[Subject_Id]
where [Participated]=1").List();
            
            var list = query.Cast<Array>()
                .GroupBy(x => x.GetValue(0)) //by year
                .Select(x => new
                {
                    Year = x.Key,
                    Value = x.GroupBy(v => v.GetValue(1)) //by subject
                        .Select(v => new
                        {
                            Subject = v.Key, Value = GetPoints(v)
                        }).ToList()
                })
                .OrderByDescending(x=>x.Year)
                .ToList();

            return list;
        }

        private int[] GetCompetitionPercents(IEnumerable<Array> array)
        {
            var attendees = new int[10];
            var students = new int[10];

            foreach (var item in array)
            {
                var numberOfPoints = (int) item.GetValue(2);
                var index = (numberOfPoints - 1) / 10;
                attendees[index]++;

                var programId = (long?)item.GetValue(3);
                if (programId.HasValue)
                    students[index]++;
            }

            var percents = new int[10];
            for (int i = 0; i < 10; i++)
            {
                if (attendees[i]!=0)
                {
                    percents[i] = (int)Math.Floor(Math.Round(students[i] * 1.0 / attendees[i] * 100,
                        MidpointRounding.AwayFromZero));
                }
            }

            return percents;
        }

        private int[] GetSeasons(IEnumerable<dynamic> list)
        {
            var count = new int[4];
            var sum = new int[4];
            foreach (var item in list)
            {
                var @event = (Event) item.Event;
                var attendeeCount = (int) item.AttendeeCount;

                var executions = @event.EventExecutions.ToList();

                if (executions.Count == 1 && executions.First().Dates.Count == 1)
                {
                    var index = GetSeasonIndex(executions.First().Dates.First().Date);
                    count[index]++;
                    sum[index] += attendeeCount;
                    continue;
                }

                var indexes = executions.SelectMany(x => x.Dates).Select(x => GetSeasonIndex(x.Date)).ToList();
                var differentCount = indexes.GroupBy(x => x).Count();

                if (differentCount == 1)
                {
                    count[indexes.First()]++;
                    sum[indexes.First()] += attendeeCount;
                }
            }

            var seasons = new int[4];
            for (int i = 0; i < 4; i++)
            {
                if (count[i] != 0)
                {
                    seasons[i] = (int)Math.Floor(Math.Round(sum[i] * 1.0 / count[i], MidpointRounding.AwayFromZero));
                }
            }

            return seasons;
        }

        private int GetSeasonIndex(DateTime date)
        {
            if (date.Month == 12 && date.Month == 1 && date.Month == 2)
                return 0;
            if(date.Month >= 3 && date.Month <= 5)
                return 1;
            if(date.Month >= 6 && date.Month <= 8)
                return 2;

            return 3;
        }

        private int[] GetPoints(IEnumerable<Array> array)
        {
            var points = new int[10];
            foreach (var item in array)
            {
                var numberOfPoints = (int) item.GetValue(2);
                var index = (numberOfPoints - 1) / 10;
                points[index]++;
            }

            return points;
        }

        public void Dispose()
        {
            session.Close();
        }
    }
}
