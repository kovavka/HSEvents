using System.Collections.Generic;
using System.Linq;
using Domain;
using Domain.IEntity;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.CityTypes
{
    public interface ICityTypeStorage
    {
        IEnumerable<CityType> GetAll();
        CityType Get(long id);
        CityType Add(CityType type);
        void Update(CityType type);
        void Delete(long id);
        void Delete(long[] ids);
    }

    public class CityTypeStorage : SimpleEntityStorage<CityType>, ICityTypeStorage
    {
        public IEnumerable<CityType> GetAll()
        {
            using (var repo = new NHGetAllRepository<CityType>())
            {
                return repo.GetAll().AsEnumerable();
            }
        }
    }
}
