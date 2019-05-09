using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Schools
{
    public interface ISchoolStorage
    {
        IEnumerable<SchoolDto> GetAllDtos(SchoolArgs args);
        SchoolDto Get(long id);
        SchoolDto Add(SchoolDto subject);
        void Update(SchoolDto subject);
        void Delete(long id);
        void Delete(long[] ids);
    }

    public class SchoolStorage : DtoStorage<School, SchoolDto, SchoolRepository>, ISchoolStorage
    {
        public IEnumerable<SchoolDto> GetAllDtos(SchoolArgs args)
        {
            using (var repo = new SchoolRepository())
            {
                var query = repo.GetAllDtos(args);
                return query;
            }
        }
    }
}
