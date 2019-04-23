using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Streets
{
    public interface IStreetStorage
    {
        IEnumerable<StreetDto> GetAllDtos(StreetArgs args);
        StreetDto Get(long id);
        StreetDto Add(StreetDto subject);
        void Update(StreetDto subject);
        void Delete(long id);
        void Delete(long[] ids);
    }

    public class StreetStorage : DtoStorage<Street, StreetDto, StreetRepository>, IStreetStorage
    {
        public IEnumerable<StreetDto> GetAllDtos(StreetArgs args)
        {
            using (var repo = new StreetRepository())
            {
                var query = repo.GetAllDtos(args);
                return query;
            }
        }
    }
}
