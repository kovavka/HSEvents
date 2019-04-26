using System.Collections.Generic;
using System.ComponentModel;
using Domain.Events;
using Domain.IEntity;

namespace Domain
{
    public class Pupil : Attendee
    {
        public virtual Sex Sex { get; set; }
        public virtual int YearOfGraduation { get; set; }
        public virtual School School { get; set; }

        public virtual AcademicProgram EnterProgram { get; set; }
        public virtual ICollection<AcademicProgram> InterestingPrograms { get; set; }
        public virtual ICollection<AcademicProgram> RegistrationPrograms { get; set; }
        public virtual ICollection<Exam> Exams { get; set; }
    }

    public enum Sex
    {
        [Description("Мужской")] Male = 0,
        [Description("Женский")] Female = 1
    }

    public class AcademicProgram : NamedEntity
    {
    }

    public class Exam : Entity
    {
        public virtual Subject Subject { get; set; }
        public virtual int NumberOfPoints { get; set; }
    }

}
