using System.Collections.Generic;
using System.Linq;
using Domain;
using Helpers;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.Regions
{
    public interface IRegionStorage
    {
        IEnumerable<Region> GetAll(RegionArgs args);
        Region Get(long id);
        Region Add(Region subject);
        void Update(Region subject);
        void Delete(long id);
        void Delete(long[] ids);
    }

    public class RegionStorage : SimpleEntityStorage<Region>, IRegionStorage
    {
        public IEnumerable<Region> GetAll(RegionArgs args)
        {
            using (var repo = new NHGetAllRepository<Region>())
            {
                var query = repo.GetAll();

                if (args.Country.IsNotEmpty())
                    query = query.Where(x => x.Country.Name == args.Country);

                return query.AsEnumerable();
            }
        }
    }
}
