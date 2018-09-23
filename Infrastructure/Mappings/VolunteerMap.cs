using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Events;

namespace Infrastructure.Mappings
{
    class VolunteerMap : EntityMap<Volunteer>
    {
        public VolunteerMap()
        {
            Map(x => x.FullName);
            References(x => x.Group).Cascade.SaveUpdate().Cascade.Delete().ForeignKey("FK_Volunteer_Group");
        }
    }
    class GroupMap : NamedEntityMap<Group>
    {
        public GroupMap()
        {
        }
    }
}
