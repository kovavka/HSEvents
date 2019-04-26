using System.Collections.Generic;
using System.Linq;
using Domain.Events;
using Domain.IEntity;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.Reports
{
    public interface IStatisticStorage
    {
        IEnumerable<object> GetCostStats();
        IEnumerable<object> GetSeasonStats();
        IEnumerable<object> GetEventsCountStats();
        IEnumerable<object> GetCompetitionStats();
        IEnumerable<object> GetExamStats();
    }

    public class StatisticStorage : IStatisticStorage
    {
        public IEnumerable<object> GetCostStats()
        {
            using (var repo = new StatisticRepository())
            {
                return repo.GetCostStats();
            }
        }

        public IEnumerable<object> GetSeasonStats()
        {
            using (var repo = new StatisticRepository())
            {
                return repo.GetSeasonStats();
            }
        }

        public IEnumerable<object> GetEventsCountStats()
        {
            using (var repo = new StatisticRepository())
            {
                return repo.GetEventsCountStats();
            }
        }

        public IEnumerable<object> GetCompetitionStats()
        {
            using (var repo = new StatisticRepository())
            {
                return repo.GetCompetitionStats();
            }
        }

        public IEnumerable<object> GetExamStats()
        {
            using (var repo = new StatisticRepository())
            {
                return repo.GetExamStats();
            }
        }
    }
}
