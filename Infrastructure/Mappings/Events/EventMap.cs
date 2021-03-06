﻿using Domain;
using Domain.Events;
using FluentNHibernate.Mapping;

namespace Infrastructure.Mappings.Events
{
    class EventMap : NamedEntityMap<Event>
    {
        public EventMap()
        {
            Map(x => x.Comment).Nullable();
            Map(x => x.Info);
            Map(x => x.Type);
            Map(x => x.Year);

            HasManyToMany(x => x.Volunteers).AsBag().Cascade.SaveUpdate().Table("VolunteerInfo");

            HasMany(x => x.Purchases)
                .ForeignKeyConstraintName("FK_Purchase_Event")
                .AsBag()
                .Cascade.AllDeleteOrphan();

            HasManyToMany(x => x.Organizers).AsBag().Cascade.SaveUpdate().Table("Organizer");
            HasManyToMany(x => x.Lecturers).AsBag().Cascade.SaveUpdate().Table("Lecturer");
            HasManyToMany(x => x.Departments).AsSet().Cascade.SaveUpdate().Table("DepartmentInfo");
            HasMany(x => x.AttendanceInfo).AsBag().Cascade.SaveUpdate().ForeignKeyConstraintName("FK_AttendanceInfo_Event");
            HasMany(x => x.EventExecutions)
                .AsSet()
                .Cascade.AllDeleteOrphan()
                .ForeignKeyConstraintName("FK_EventExecution_Event");
        }
    }
    
    class CourseMap : SubclassMap<Course>
    {
        public CourseMap()
        {
            Map(x => x.Price).Nullable();
            Map(x => x.Duration).Nullable();
            References(x => x.Subject).Cascade.SaveUpdate().ForeignKey("FK_Course_Subject").Fetch.Join();
        }
    }

    class AcademicCompetitionMap : SubclassMap<AcademicCompetition>
    {
        public AcademicCompetitionMap()
        {
            References(x => x.Subject).Cascade.SaveUpdate().ForeignKey("FK_AcademicCompetition_Subject").Fetch.Join();
            HasMany(x => x.Results).AsBag().Cascade.SaveUpdate().ForeignKeyConstraintName("FK_Result_AcademicCompetition");
        }
    }

    class SchoolWorkMap : SubclassMap<SchoolWork>
    {
        public SchoolWorkMap()
        {
            Map(x => x.Program).Nullable();
        }
    }

    class SubjectMap : NamedEntityMap<Subject>
    {
        public SubjectMap()
        {
        }
    }
    class ResultTypeMap : NamedEntityMap<ResultType>
    {
        public ResultTypeMap()
        {
        }
    }

    class DepartmentMap : NamedEntityMap<Department>
    {
        public DepartmentMap()
        {
            Map(x => x.Color);
        }
    }
    class EmployeeMap : PersonMap<Employee>
    {
        public EmployeeMap()
        {
            Map(x => x.Appointment);
            References(x => x.User).Cascade.SaveUpdate().ForeignKey("FK_Employee_User");
        }
    }
    class UserMap : EntityMap<User>
    {
        public UserMap()
        {
            Map(x => x.Login);
            Map(x => x.Password);
            Map(x => x.Type);
        }
    }
    class EventExecutionMap : EntityMap<EventExecution>
    {
        public EventExecutionMap()
        {
            HasMany(x => x.Dates).AsBag().Cascade.SaveUpdate().ForeignKeyConstraintName("FK_EventDate_EventExecution");
            References(x => x.Address).Cascade.SaveUpdate().ForeignKey("FK_EventExecution_Address");
            References(x => x.Event).ForeignKey("FK_EventExecution_Event");
        }
    }
    class EventDateMap : EntityMap<EventDate>
    {
        public EventDateMap()
        {
            Map(x => x.Date);
            Map(x => x.StartTime).CustomType("TimeAsTimeSpan");
            Map(x => x.EndTime).CustomType("TimeAsTimeSpan");
        }
    }
    class PurchaseMap : NamedEntityMap<Purchase>
    {
        public PurchaseMap()
        {
            Map(x => x.Price);
            Map(x => x.Description);
            References(x => x.Event).ForeignKey("FK_Purchase_Event");
        }
    }
    class AttendanceInfoMap : EntityMap<AttendanceInfo>
    {
        public AttendanceInfoMap()
        {
            Map(x => x.Participated);
            References(x => x.Attendee).Cascade.SaveUpdate().ForeignKey("FK_AttendanceInfo_Attendee");
        }
    }
    class ResultInfoMap : EntityMap<Result>
    {
        public ResultInfoMap()
        {
            Map(x => x.NumberOfPoints);
            References(x => x.Type).Cascade.SaveUpdate().ForeignKey("FK_Result_ResultType");
            References(x => x.Pupil).Cascade.SaveUpdate().ForeignKey("FK_Result_Pupil");
        }
    }
}
