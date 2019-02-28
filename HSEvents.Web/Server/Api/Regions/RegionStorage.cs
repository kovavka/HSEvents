using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.Regions
{
    public interface IRegionStorage
    {
        IEnumerable<Region> GetAll();
        Region Get(long id);
        Region Add(Region subject);
        void Update(Region subject);
        void Delete(long id);
    }

    public class RegionStorage : SimpleEntityStorage<Region>, IRegionStorage
    {
        public IEnumerable<Region> GetAll()
        {
            using (var repo = new NHGetAllRepository<Region>())
            {
                return repo.GetAll().AsEnumerable();
            }
        }
    }
}
