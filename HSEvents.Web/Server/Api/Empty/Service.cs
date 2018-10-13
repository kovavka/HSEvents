using System.Collections.Generic;
using Domain.IEntity;

namespace HSEvents.Server.Api.Empty
{
    public interface IService
    {
        IEnumerable<Entity> GetAll();
    }

    public class Service : IService
    {
        private readonly IStorage Storage;

        public Service(IStorage Storage)
        {
            this.Storage = Storage;
        }
        
        public IEnumerable<Entity> GetAll()
        {
           return Storage.GetAll();
        }
    }
}
