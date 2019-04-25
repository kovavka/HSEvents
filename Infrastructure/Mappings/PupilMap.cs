using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Domain.Events;
using FluentNHibernate.Mapping;

namespace Infrastructure.Mappings
{
    class PupilMap : SubclassMap<Pupil>
    {
        public PupilMap()
        {
            Map(x => x.Sex);
            Map(x => x.YearOfGraduation);
            References(x => x.School).Cascade.SaveUpdate().ForeignKey("FK_Pupil_School");
            References(x => x.EnterProgram).Cascade.SaveUpdate().ForeignKey("FK_Pupil_EnterProgram");
            HasManyToMany(x => x.InterestingPrograms).AsBag().Cascade.SaveUpdate().Table("InterestingProgram");
            HasManyToMany(x => x.RegistrationPrograms).AsBag().Cascade.SaveUpdate().Table("RegistrationProgram");
        }
    }

    class AttendeeMap : PersonMap<Attendee>
    {
        public AttendeeMap()
        {
            Map(x => x.Type).Nullable();
            References(x => x.User).Cascade.SaveUpdate().ForeignKey("FK_Attendee_User");
        }
    }

    class ContactPersonMap : PersonMap<ContactPerson>
    {
        public ContactPersonMap()
        {
            Map(x => x.Appointment).Nullable();
        }
    }
    
    class AcademicProgramMap : NamedEntityMap<AcademicProgram>
    {
    }


    class SchoolMap : NamedEntityMap<School>
    {
        public SchoolMap()
        {
            References(x => x.Type).Cascade.SaveUpdate().Cascade.Delete().ForeignKey("FK_School_SchoolType");
            Map(x => x.Number).Nullable(); 

            Map(x => x.BelongToUniversityDistrict);
            Map(x => x.HasPriority);
            HasMany(x => x.Addresses).AsBag().Cascade.SaveUpdate().ForeignKeyConstraintName("FK_Address_School");
            HasMany(x => x.Contacts).AsBag().Cascade.SaveUpdate().ForeignKeyConstraintName("FK_ContactPerson_School");
        }
    }

    class SchoolTypeMap : NamedEntityMap<SchoolType>
    {
    }
}
