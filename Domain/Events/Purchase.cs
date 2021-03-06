﻿using Domain.IEntity;
using Newtonsoft.Json;

namespace Domain.Events
{
    public class Purchase : NamedEntity
    {
        public virtual decimal Price { get; set; }
        public virtual string Description { get; set; }
        [JsonIgnore]
        public virtual Event Event { get; set; }
    }
}
