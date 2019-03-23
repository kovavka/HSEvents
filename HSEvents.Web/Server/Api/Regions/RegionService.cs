using System.Collections.Generic;
using Domain;
using Domain.IEntity;

namespace HSEvents.Server.Api.Regions
{
    public interface IRegionService
    {
        IEnumerable<Region> GetAll(RegionArgs args);
        Region Get(long id);
        Region Add(Region subject);
        void Update(Region subject);
        void Delete(long id);
        void Delete(long[] ids);
    }

    public class RegionService : IRegionService
    {
        private readonly IRegionStorage regionStorage;

        public RegionService(IRegionStorage regionStorage)
        {
            this.regionStorage = regionStorage;
        }
        
        public IEnumerable<Region> GetAll(RegionArgs args)
        {
           return regionStorage.GetAll(args);
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

        public void Delete(long[] ids)
        {
            regionStorage.Delete(ids);
        }
    }
}
