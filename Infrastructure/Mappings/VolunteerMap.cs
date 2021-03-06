﻿using Domain.Events;

namespace Infrastructure.Mappings
{
    class VolunteerMap : EntityMap<Volunteer>
    {
        public VolunteerMap()
        {
            Map(x => x.FullName);
            References(x => x.Group)
                .Fetch.Join()
                .Cascade.SaveUpdate()
                .Cascade.Delete().ForeignKey("FK_Volunteer_Group");
        }
    }
    class GroupMap : NamedEntityMap<Group>
    {
        public GroupMap()
        {
        }
    }
}
