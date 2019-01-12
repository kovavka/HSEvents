using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Addresses
{
    public interface IAddressStorage
    {
        IEnumerable<AddressDto> GetAll();
    }

    public class AddressStorage : IAddressStorage
    {
        public IEnumerable<AddressDto> GetAll()
        {
            using (var repo = new NHGetAllRepository<Address>())
            {
                return repo.GetAll()
                    .AsEnumerable()
                    .Select(x => new AddressDto
                    {
                        Id = x.Id,
                        ShortName = x.ToString(),
                        Caption = x.FullAddress,
                        House = x.House,
                        StreetId = x.Street.Id,
                    });
            }
        }
    }
}
