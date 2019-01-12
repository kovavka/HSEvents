using System;
using System.Collections.Generic;
using Domain.Events;

namespace Infrastructure.Repositories.Dto
{
    public class EventDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public EventType Type { get; set; }
        public string Info { get; set; }
        public string Comment { get; set; }
        public List<Department> Departments { get; set; }
        public List<Volunteer> Volunteers { get; set; }
        public virtual List<Purchase> Purchases { get; set; }
        public virtual List<Employee> Organizers { get; set; }
        public virtual List<Employee> Lecturers { get; set; }

        #region Course or AcademicCompetition
        public Subject Subject { get; set; }
        #endregion

        #region Course
        public decimal? Price { get; set; }
        public int? Duration { get; set; }
        #endregion

        #region SchoolWork
        public string Program { get; set; }
        #endregion

        public List<EventExecutionDto> Executions { get; set; }
    }

     public class EventExecutionDto
    {
        public long Id { get; set; }
        public List<EventDateDto> Dates { get; set; }
        public AddressDto Address { get; set; }

    }

    public class EventDateDto
    {
        public DateTime Date { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
    }


}