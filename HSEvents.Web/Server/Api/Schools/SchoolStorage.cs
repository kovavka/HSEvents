using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Schools
{
    public interface ISchoolStorage
    {
        IEnumerable<SchoolDto> GetAllDtos();
        SchoolDto Get(long id);
        SchoolDto Add(SchoolDto subject);
        void Update(SchoolDto subject);
        void Delete(long id);
        void Delete(long[] ids);
    }

    public class SchoolStorage : DtoStorage<School, SchoolDto, SchoolRepository>, ISchoolStorage
    {
    }
}
