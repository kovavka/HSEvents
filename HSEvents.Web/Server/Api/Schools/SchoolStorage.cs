using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Schools
{
    public interface ISchoolStorage
    {
        IEnumerable<SchoolDto> GetAll();
        SchoolDto Get(long id);
        SchoolDto Add(SchoolDto subject);
        void Update(SchoolDto subject);
        void Delete(long id);
    }

    public class SchoolStorage : SimpleEntityStorage<SchoolDto>, ISchoolStorage
    {
        public IEnumerable<SchoolDto> GetAll()
        {
            using (var repo = new SchoolRepository())
            {
                return repo.GetAllDtos();
            }
        }
        public SchoolDto Get(long id)
        {
            using (var repo = new NHGetAllRepository<SchoolDto>())
            {
                return repo.Get(id);
            }
        }

        public SchoolDto Add(SchoolDto entity)
        {
            using (var repo = new NHGetAllRepository<SchoolDto>())
            {
                return repo.Add(entity);
            }
        }

        public void Update(SchoolDto entity)
        {
            using (var repo = new NHGetAllRepository<SchoolDto>())
            {
                repo.Update(entity);
            }
        }

        public void Delete(long id)
        {
            using (var repo = new NHGetAllRepository<SchoolDto>())
            {
                repo.Delete(id);
            }
        }
    }
}
