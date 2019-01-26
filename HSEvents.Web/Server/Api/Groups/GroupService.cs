using System.Collections.Generic;
using Domain.Events;

namespace HSEvents.Server.Api.Groups
{
    public interface IGroupService
    {
        IEnumerable<Group> GetAll();
        Group Get(long id);
        Group Add(Group group);
        void Update(Group group);
        void Delete(long id);
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

        public Group Get(long id)
        {
            return groupStorage.Get(id);
        }

        public Group Add(Group group)
        {
            return groupStorage.Add(group);
        }

        public void Update(Group group)
        {
            groupStorage.Update(group);
        }

        public void Delete(long id)
        {
            groupStorage.Delete(id);
        }
    }
}
