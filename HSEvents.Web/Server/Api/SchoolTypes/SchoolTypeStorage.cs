using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.SchoolTypes
{
    public interface ISchoolTypeStorage
    {
        IEnumerable<SchoolType> GetAll();
        SchoolType Get(long id);
        SchoolType Add(SchoolType type);
        void Update(SchoolType type);
        void Delete(long id);
        void Delete(long[] ids);
    }

    public class SchoolTypeStorage : SimpleEntityStorage<SchoolType>, ISchoolTypeStorage
    {
        public IEnumerable<SchoolType> GetAll()
        {
            using (var repo = new NHGetAllRepository<SchoolType>())
            {
                return repo.GetAll().AsEnumerable();
            }
        }
    }
}
