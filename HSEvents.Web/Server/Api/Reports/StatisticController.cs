using System.Collections.Generic;
using System.Web.Http;
using Domain.Events;
using Domain.IEntity;

namespace HSEvents.Server.Api.Reports
{
    [AllowAnonymous]
    public class StatisticController : ApiController
    {
        private readonly IStatisticService statisticService;
        public StatisticController(IStatisticService statisticService)
        {
            this.statisticService = statisticService;
        }

        [HttpGet]
        public IEnumerable<object> GetCostStats()
        {
            return statisticService.GetCostStats();
        }

        [HttpGet]
        public IEnumerable<object> GetSeasonStats()
        {
            return statisticService.GetSeasonStats();
        }

        [HttpGet]
        public IEnumerable<object> GetEventsCountStats()
        {
            return statisticService.GetEventsCountStats();
        }

        [HttpGet]
        public IEnumerable<object> GetCompetitionStats()
        {
            return statisticService.GetCompetitionStats();
        }

        [HttpGet]
        public IEnumerable<object> GetExamStats()
        {
            return statisticService.GetExamStats();
        }
    }
}
