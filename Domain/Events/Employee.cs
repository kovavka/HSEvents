﻿using Domain.IEntity;

namespace Domain.Events
{
    public class Employee : PersonEntity
    {
        public virtual string Appointment { get; set; }
        public virtual User User { get; set; }
    }
}
