using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.Regions
{
    public interface IRegionStorage
    {
        IEnumerable<Region> GetAll();
    }

    public class RegionStorage : IRegionStorage
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
