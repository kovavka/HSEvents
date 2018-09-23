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
            HasManyToMany(x => x.IntrestingPrograms).AsBag().Cascade.SaveUpdate().Table("IntrestingProgram");
            HasManyToMany(x => x.RegistrarionPrograms).AsBag().Cascade.SaveUpdate().Table("RegistrarionProgram");
        }
    }

    class AttendeeMap : PersonMap<Attendee>
    {
        public AttendeeMap()
        {
            Map(x => x.Type).Nullable();
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
            References(x => x.Type).Cascade.SaveUpdate().Cascade.Delete().ForeignKey("FK_Schoole_SchoolType");
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
