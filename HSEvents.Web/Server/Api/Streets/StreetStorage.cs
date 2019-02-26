using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Streets
{
    public interface IStreetStorage
    {
        IEnumerable<StreetDto> GetAll();
        StreetDto Get(long id);
        StreetDto Add(StreetDto subject);
        void Update(StreetDto subject);
        void Delete(long id);
    }

    public class StreetStorage : SimpleEntityStorage<StreetDto>, IStreetStorage
    {
        public IEnumerable<StreetDto> GetAll()
        {
            using (var repo = new NHGetAllRepository<Street>())
            {
                return repo.GetAll()
                    .AsEnumerable()
                    .Select(x => new StreetDto()
                    {
                        Id = x.Id,
                        Name = x.Name,
                        CityId = x.City.Id
                    });
            }
        }

        public T Get(long id)
        {
            using (var repo = new NHGetAllRepository<T>())
            {
                return repo.Get(id);
            }
        }

        public T Add(T entity)
        {
            using (var repo = new NHGetAllRepository<T>())
            {
                return repo.Add(entity);
            }
        }

        public void Update(T entity)
        {
            using (var repo = new NHGetAllRepository<T>())
            {
                repo.Update(entity);
            }
        }

        public void Delete(long id)
        {
            using (var repo = new NHGetAllRepository<T>())
            {
                repo.Delete(id);
            }
        }
    }
}
