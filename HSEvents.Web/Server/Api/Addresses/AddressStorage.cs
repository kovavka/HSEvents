using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Addresses
{
    public interface IAddressStorage
    {
        IEnumerable<AddressDto> GetAllDtos();
        AddressDto Get(long id);
        AddressDto Add(AddressDto subject);
        void Update(AddressDto subject);
        void Delete(long id);
    }

    public class AddressStorage : DtoStorage<Address, AddressDto, AddressRepository>, IAddressStorage
    {
    }
}
