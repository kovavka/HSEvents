using System.Collections.Generic;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Addresses
{
    public interface IAddressService
    {
        IEnumerable<AddressDto> GetAll();
        AddressDto Get(long id);
        AddressDto Add(AddressDto subject);
        void Update(AddressDto subject);
        void Delete(long id);
        void Delete(long[] ids);
    }

    public class AddressService : IAddressService
    {
        private readonly IAddressStorage addressStorage;

        public AddressService(IAddressStorage addressStorage)
        {
            this.addressStorage = addressStorage;
        }
        
        public IEnumerable<AddressDto> GetAll()
        {
           return addressStorage.GetAllDtos();
        }

        public AddressDto Get(long id)
        {
            return addressStorage.Get(id);
        }

        public AddressDto Add(AddressDto subject)
        {
            return addressStorage.Add(subject);
        }

        public void Update(AddressDto subject)
        {
            addressStorage.Update(subject);
        }

        public void Delete(long id)
        {
            addressStorage.Delete(id);
        }

        public void Delete(long[] ids)
        {
            addressStorage.Delete(ids);
        }
    }
}
