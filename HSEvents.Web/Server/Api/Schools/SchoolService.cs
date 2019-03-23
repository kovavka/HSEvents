using System.Collections.Generic;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Schools
{
    public interface ISchoolService
    {
        IEnumerable<SchoolDto> GetAll();
        SchoolDto Get(long id);
        SchoolDto Add(SchoolDto subject);
        void Update(SchoolDto subject);
        void Delete(long id);
        void Delete(long[] ids);
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
           return schoolStorage.GetAllDtos();
        }

        public SchoolDto Get(long id)
        {
            return schoolStorage.Get(id);
        }

        public SchoolDto Add(SchoolDto subject)
        {
            return schoolStorage.Add(subject);
        }

        public void Update(SchoolDto subject)
        {
            schoolStorage.Update(subject);
        }

        public void Delete(long id)
        {
            schoolStorage.Delete(id);
        }

        public void Delete(long[] ids)
        {
            schoolStorage.Delete(ids);
        }
    }
}
