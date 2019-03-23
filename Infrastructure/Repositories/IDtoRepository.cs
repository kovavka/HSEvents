using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Domain.IEntity;
using NHibernate;
using NHibernate.Linq;

namespace Infrastructure.Repositories
{
    public interface IDtoRepository<T, TDto> : IDisposable where T : IEntity
    {
        IQueryable<T> GetAll();
        TDto Get(long id);
        void Delete(long id);
        void Delete(long[] ids);
        void Update(TDto dto);
        TDto Add(TDto dto);
        IEnumerable<TDto> GetAllDtos();
    }

    public abstract class NHDtoRepository<T, TDto> : IDtoRepository<T, TDto> where T : Entity
    {
        private ISession session = NHibernateHelper.OpenSession();
        public IQueryable<T> GetAll()
        {
            IQueryable<T> query;
            using (var tx = session.BeginTransaction(IsolationLevel.ReadCommitted))
            {
                query = GetAllQuery();
                tx.Commit();
            }

            return query;
        }

        public abstract IEnumerable<TDto> GetAllDtos();

        public TDto Get(long id)
        {
            var entity = GetAllQuery().FirstOrDefault(x => x.Id == id);
            return ConvertToDto(entity);
        }

        public void Delete(long id)
        {
            using (var tx = session.BeginTransaction())
            {
                session.Query<T>()
                    .Where(x => x.Id == id)
                    .Delete();
                tx.Commit();
            }
        }

        public void Delete(long[] ids)
        {
            using (var tx = session.BeginTransaction())
            {
                session.Query<T>()
                    .Where(x => ids.Contains(x.Id))
                    .Delete();
                tx.Commit();
            }
        }

        public void Update(TDto dto)
        {
            var entity = ConvertToEntity(dto);
            using (var tx = session.BeginTransaction())
            {
                session.Update(entity);
                tx.Commit();
            }
        }

        public TDto Add(TDto dto)
        {
            var entity = ConvertToEntity(dto);
            long id;
            using (var tx = session.BeginTransaction())
            {
                id = (long)session.Save(entity);
                tx.Commit();
            }

            return Get(id);
        }

        public void Dispose()
        {
            session.Close();
        }


        protected virtual IQueryable<T> GetAllQuery()
        {
            return session.Query<T>();
        }

        protected abstract TDto ConvertToDto(T entity);

        protected abstract T ConvertToEntity(TDto dto);

    }

}
