using System.Collections.Generic;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Addresses
{
    public interface IAddressService
    {
        IEnumerable<AddressDto> GetAll();
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
           return addressStorage.GetAll();
        }
    }
}
