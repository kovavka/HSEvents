﻿using Domain.IEntity;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api
{
    public class DtoStorage<T, TDto, Repo> where T : Entity where Repo : IGetAllRepository<T>, new()
    {
        public TDto Get(long id)
        {
            using (var repo = new Repo())
            {
                return repo.Get(id);
            }
        }

        public TDto Add(T entity)
        {
            using (var repo = new Repo())
            {
                return repo.Add(entity);
            }
        }

        public void Update(T entity)
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
    }
}