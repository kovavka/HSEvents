using System.Collections.Generic;
using Domain;

namespace HSEvents.Server.Api.SchoolTypes
{
    public interface ISchoolTypeService
    {
        IEnumerable<SchoolType> GetAll();
        SchoolType Get(long id);
        SchoolType Add(SchoolType type);
        void Update(SchoolType type);
        void Delete(long id);
    }

    public class SchoolTypeService : ISchoolTypeService
    {
        private readonly ISchoolTypeStorage schoolTypeStorage;

        public SchoolTypeService(ISchoolTypeStorage schoolTypeStorage)
        {
            this.schoolTypeStorage = schoolTypeStorage;
        }
        
        public IEnumerable<SchoolType> GetAll()
        {
           return schoolTypeStorage.GetAll();
        }

        public SchoolType Get(long id)
        {
            return schoolTypeStorage.Get(id);
        }

        public SchoolType Add(SchoolType type)
        {
            return schoolTypeStorage.Add(type);
        }

        public void Update(SchoolType type)
        {
            schoolTypeStorage.Update(type);
        }

        public void Delete(long id)
        {
            schoolTypeStorage.Delete(id);
        }
    }
}
