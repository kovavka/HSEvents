using System.Collections.Generic;
using Domain;

namespace HSEvents.Server.Api.SchoolTypes
{
    public interface ISchoolTypeService
    {
        IEnumerable<SchoolType> GetAll();
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
    }
}
