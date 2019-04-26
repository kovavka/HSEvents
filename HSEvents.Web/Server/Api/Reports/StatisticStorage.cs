using System.Collections.Generic;
using System.Linq;
using Domain.Events;
using Domain.IEntity;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.Reports
{
    public interface IStatisticStorage
    {
        IEnumerable<object> GetExamStats();
    }

    public class StatisticStorage : IStatisticStorage
    {
        public IEnumerable<object> GetExamStats()
        {
            using (var repo = new StatisticRepository())
            {
                return repo.GetExamStats();
            }
        }
    }
}
