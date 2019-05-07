using System;
using System.Collections.Generic;
using Domain;
using Domain.Events;

namespace Infrastructure.Repositories.Dto
{
    public class AttendeeDto
    {
        public long Id { get; set; }
        public virtual string FullName { get; set; }
        public virtual string PhoneNumber { get; set; }
        public virtual string Email { get; set; }
        public virtual AttendeeType Type { get; set; }

        #region UserProps
        public virtual string Login { get; set; }
        public virtual string Password { get; set; }
        #endregion

        #region PupilProps
        public virtual Sex Sex { get; set; }
        public virtual int YearOfGraduation { get; set; }
        public virtual long SchoolId { get; set; }
        public virtual ICollection<long> InterestingProgramIds { get; set; }
        #endregion
    }
    

}