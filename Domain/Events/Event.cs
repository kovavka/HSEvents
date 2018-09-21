using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.IEntity;

namespace Domain.Events
{
    public class Event : NamedEntity
    {
        public virtual EventType Type { get; set; }
        public virtual string Comment { get; set; }
        public virtual string Info { get; set; }

        public virtual ICollection<Volunteer> Volunteers { get; set; }
        public virtual ICollection<Purchase> Purchases { get; set; }
        public virtual ICollection<Employee> Organizers { get; set; }
        public virtual ICollection<Employee> Lecturers { get; set; }
        public virtual ICollection<Department> Departments { get; set; }
        
        public virtual ICollection<AttendanceInfo> AttendanceInfo { get; set; }


        public virtual ICollection<EventExecution> EventExecutions { get; set; }
    }

    public enum EventType
    {
        [Description("Курсы")] Course = 1,
        [Description("Олимпиада")] AcademicCompetition = 2,
        [Description("Работа со школами")] SchoolWork = 3
    }
}
