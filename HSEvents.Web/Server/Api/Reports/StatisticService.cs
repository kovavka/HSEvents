using System.Collections.Generic;
using Domain.Events;
using Domain.IEntity;

namespace HSEvents.Server.Api.Reports
{
    public interface IStatisticService
    {
        IEnumerable<object> GetExamStats();
    }

    public class StatisticService : IStatisticService
    {
        private readonly IStatisticStorage statisticStorage;

        public StatisticService(IStatisticStorage statisticStorage)
        {
            this.statisticStorage = statisticStorage;
        }
        
        public IEnumerable<object> GetExamStats()
        {
           return statisticStorage.GetExamStats();
        }
    }
}
