using System.Collections.Generic;
using System.ComponentModel;
using Domain.IEntity;

namespace Domain
{
    public class Pupil : Attendee
    {
        public virtual Sex Sex { get; set; }
        public virtual int YearOfGraduation { get; set; }
        public virtual School School { get; set; }

        public virtual AcademicProgram EnterProgram { get; set; }
        public virtual ICollection<AcademicProgram> IntrestingPrograms { get; set; }
        public virtual ICollection<AcademicProgram> RegistrarionPrograms { get; set; }
    }

    public enum Sex
    {
        [Description("Мужской")] Male = 0,
        [Description("Женский")] Female = 1
    }

    public class AcademicProgram : NamedEntity
    {
    }

}
