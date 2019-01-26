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

        [HttpGet]
        public Group Get(long id)
        {
            return groupService.Get(id);
        }

        [HttpPut]
        public Group Add(Group group)
        {
            return groupService.Add(group);
        }

        [HttpPut]
        public void Update(Group group)
        {
            groupService.Update(group);
        }

        [HttpPost]
        public void Delete([FromBody] long id)
        {
            groupService.Delete(id);
        }
    }
}
