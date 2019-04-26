using System.Collections.Generic;
using Domain.Events;
using Domain.IEntity;

namespace HSEvents.Server.Api.Reports
{
    public interface IStatisticService
    {
        IEnumerable<object> GetCostStats();
        IEnumerable<object> GetSeasonStats();
        IEnumerable<object> GetEventsCountStats();
        IEnumerable<object> GetCompetitionStats();
        IEnumerable<object> GetExamStats();
    }

    public class StatisticService : IStatisticService
    {
        private readonly IStatisticStorage statisticStorage;

        public StatisticService(IStatisticStorage statisticStorage)
        {
            this.statisticStorage = statisticStorage;
        }
        
        public IEnumerable<object> GetCostStats()
        {
           return statisticStorage.GetCostStats();
        }
        
        public IEnumerable<object> GetSeasonStats()
        {
           return statisticStorage.GetSeasonStats();
        }
        
        public IEnumerable<object> GetEventsCountStats()
        {
           return statisticStorage.GetEventsCountStats();
        }
        
        public IEnumerable<object> GetCompetitionStats()
        {
           return statisticStorage.GetCompetitionStats();
        }
        
        public IEnumerable<object> GetExamStats()
        {
           return statisticStorage.GetExamStats();
        }
    }
}
