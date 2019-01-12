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
    }

    public class SchoolStorage : ISchoolStorage
    {
        public IEnumerable<SchoolDto> GetAll()
        {
            using (var repo = new SchoolRepository())
            {
                return repo.GetAllDtos();
            }
        }
    }
}
