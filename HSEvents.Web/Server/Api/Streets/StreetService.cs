using System.Collections.Generic;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Streets
{
    public interface IStreetService
    {
        IEnumerable<StreetDto> GetAll();
        StreetDto Get(long id);
        StreetDto Add(StreetDto subject);
        void Update(StreetDto subject);
        void Delete(long id);
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
           return streetStorage.GetAllDtos();
        }

        public StreetDto Get(long id)
        {
            return streetStorage.Get(id);
        }

        public StreetDto Add(StreetDto subject)
        {
            return streetStorage.Add(subject);
        }

        public void Update(StreetDto subject)
        {
            streetStorage.Update(subject);
        }

        public void Delete(long id)
        {
            streetStorage.Delete(id);
        }
    }
}
