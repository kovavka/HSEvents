using System.Collections.Generic;
using System.Web.Http;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Addresses
{
    [AllowAnonymous]
    public class AddressController : ApiController
    {
        private readonly IAddressService addressService;
        public AddressController(IAddressService addressService)
        {
            this.addressService = addressService;
        }

        [HttpGet]
        public IEnumerable<AddressDto> GetAll()
        {
            return addressService.GetAll();
        }

        [HttpGet]
        public AddressDto Get(long id)
        {
            return addressService.Get(id);
        }

        [HttpPut]
        public AddressDto Add(AddressDto subject)
        {
            return addressService.Add(subject);
        }

        [HttpPut]
        public void Update(AddressDto subject)
        {
            addressService.Update(subject);
        }

        [HttpPost]
        public void Delete([FromBody] long id)
        {
            addressService.Delete(id);
        }

        [HttpPost]
        public void DeleteSeveral([FromBody] long[] ids)
        {
            addressService.Delete(ids);
        }
    }
}
