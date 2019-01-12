using System.Collections.Generic;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Schools
{
    public interface ISchoolService
    {
        IEnumerable<SchoolDto> GetAll();
    }

    public class SchoolService : ISchoolService
    {
        private readonly ISchoolStorage schoolStorage;

        public SchoolService(ISchoolStorage schoolStorage)
        {
            this.schoolStorage = schoolStorage;
        }
        
        public IEnumerable<SchoolDto> GetAll()
        {
           return schoolStorage.GetAll();
        }
    }
}
