using System.Collections.Generic;
using System.Linq;
using Domain;
using Domain.IEntity;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.SchoolTypes
{
    public interface ISchoolTypeStorage
    {
        IEnumerable<SchoolType> GetAll();
    }

    public class SchoolTypeStorage : ISchoolTypeStorage
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
