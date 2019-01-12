using System.Collections.Generic;
using System.Web.Http;
using Domain.Events;
using HSEvents.Server.Api.Departments;

namespace HSEvents.Server.Api.Groups
{
    [AllowAnonymous]
    public class GroupController : ApiController
    {
        private readonly IGroupService groupService;
        public GroupController(IGroupService groupService)
        {
            this.groupService = groupService;
        }

        [HttpGet]
        public IEnumerable<Group> GetAll()
        {
            return groupService.GetAll();
        }
    }
}
