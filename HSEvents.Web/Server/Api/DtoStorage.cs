using System.Collections.Generic;
using System.Linq;
using Domain.IEntity;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api
{
    public class DtoStorage<T, TDto, Repo> where T : Entity where Repo : IDtoRepository<T, TDto>, new()
    {
        public IEnumerable<T> GetAll()
        {
            using (var repo = new Repo())
            {
                return repo.GetAll().ToList();
            }
        }

        public IEnumerable<TDto> GetAllDtos()
        {
            using (var repo = new Repo())
            {
                return repo.GetAllDtos().ToList();
            }
        }

        public TDto Get(long id)
        {
            using (var repo = new Repo())
            {
                return repo.Get(id);
            }
        }

        public TDto Add(TDto entity)
        {
            using (var repo = new Repo())
            {
                return repo.Add(entity);
            }
        }

        public void Update(TDto entity)
        {
            using (var repo = new Repo())
            {
                repo.Update(entity);
            }
        }

        public void Delete(long id)
        {
            using (var repo = new Repo())
            {
                repo.Delete(id);
            }
        }

        public void Delete(long[] ids)
        {
            using (var repo = new Repo())
            {
                repo.Delete(ids);
            }
        }
    }
}