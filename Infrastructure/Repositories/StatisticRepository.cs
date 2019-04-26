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

        public IEnumerable<object> GetExamStats()
        {
            //вот это очень плохое решение, надо нормально оформить хотя бы
          var query =  session.CreateSQLQuery(@"SELECT [Year], [Subject].[Name], [NumberOfPoints] 
FROM [HSEvents].[dbo].[AttendanceInfo]
inner join [HSEvents].[dbo].[Course] on [Course].[Event_Id]=[AttendanceInfo].[Event_Id]
inner join [HSEvents].[dbo].[Exam] on ([Exam].[Pupil_Id]=[AttendanceInfo].[Attendee_Id] and [Exam].[Subject_Id]=[Course].[Subject_Id] and [Exam].[Year]=[Course].[ExamYear])
inner join [HSEvents].[dbo].[Subject] on [Subject].Id=[Course].[Subject_Id]
where [Participated]=1").List();

            var nr = query.Cast<Array>();

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
                }).ToList();

            return list;
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
