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
    }
}
