﻿using System.Collections.Generic;
using Domain.Events;

namespace Infrastructure.Repositories.Dto
{
    public class EventDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public EventType Type { get; set; }
        public string Info { get; set; }

        public List<EventExecutionDto> Executions { get; set; }
    }

     public class EventExecutionDto
    {
        public int Id { get; set; }
        public List<EventDate> Dates { get; set; }
        public AddressDto Address { get; set; }

    }

    public class AddressDto
    {
        public int Id { get; set; }
        public string Caption { get; set; }
        public string ShortName { get; set; }

    }


}