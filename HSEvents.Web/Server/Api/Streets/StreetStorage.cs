using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Streets
{
    public interface IStreetStorage
    {
        IEnumerable<StreetDto> GetAll();
        StreetDto Get(long id);
        StreetDto Add(StreetDto subject);
        void Update(StreetDto subject);
        void Delete(long id);
    }

    public class StreetStorage : DtoStorage<Street, StreetDto, StreetRepository>, IStreetStorage
    {
    }
}
