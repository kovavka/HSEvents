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
    }

    public class CityTypeStorage : ICityTypeStorage
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
