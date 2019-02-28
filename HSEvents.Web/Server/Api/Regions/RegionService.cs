using System.Collections.Generic;
using Domain;
using Domain.IEntity;

namespace HSEvents.Server.Api.Regions
{
    public interface IRegionService
    {
        IEnumerable<Region> GetAll();
        Region Get(long id);
        Region Add(Region subject);
        void Update(Region subject);
        void Delete(long id);
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

        public Region Get(long id)
        {
            return regionStorage.Get(id);
        }

        public Region Add(Region subject)
        {
            return regionStorage.Add(subject);
        }

        public void Update(Region subject)
        {
            regionStorage.Update(subject);
        }

        public void Delete(long id)
        {
            regionStorage.Delete(id);
        }
    }
}
