using System.Collections.Generic;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Streets
{
    public interface IStreetService
    {
        IEnumerable<StreetDto> GetAll();
    }

    public class StreetService : IStreetService
    {
        private readonly IStreetStorage streetStorage;

        public StreetService(IStreetStorage streetStorage)
        {
            this.streetStorage = streetStorage;
        }
        
        public IEnumerable<StreetDto> GetAll()
        {
           return streetStorage.GetAll();
        }
    }
}
