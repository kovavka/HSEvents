using System.Collections.Generic;
using Domain.Events;
using HSEvents.Server.Api.Departments;

namespace HSEvents.Server.Api.Groups
{
    public interface IGroupService
    {
        IEnumerable<Group> GetAll();
    }

    public class GroupService : IGroupService
    {
        private readonly IGroupStorage groupStorage;

        public GroupService(IGroupStorage groupStorage)
        {
            this.groupStorage = groupStorage;
        }
        
        public IEnumerable<Group> GetAll()
        {
           return groupStorage.GetAll();
        }
    }
}
