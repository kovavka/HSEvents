using System.Collections.Generic;
using Domain;
using Domain.IEntity;

namespace HSEvents.Server.Api.Regions
{
    public interface IRegionService
    {
        IEnumerable<Region> GetAll();
    }

    public class RegionService : IRegionService
    {
        private readonly IRegionStorage regionStorage;

        public RegionService(IRegionStorage regionStorage)
        {
            this.regionStorage = regionStorage;
        }
        
        public IEnumerable<Region> GetAll()
        {
           return regionStorage.GetAll();
        }
    }
}
