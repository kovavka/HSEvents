using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Domain.IEntity;
using FluentNHibernate.Mapping;

namespace Infrastructure.Mappings
{
    class EntityMap<T> : ClassMap<T> where T: IEntity
    {
        public EntityMap()
        {
            Id(x => x.Id);
        }
    }

    class NamedEntityMap<T> : EntityMap<T> where T : INamedEntity
    {
        public NamedEntityMap()
        {
            Map(x => x.Name);
        }
    }

    class PersonMap<T> : EntityMap<T> where T : IPersonEntiny
    {
        public PersonMap()
        {
            Component(m => m.ContactInfo,
                c =>
                {
                    c.Map(x => x.FullName);
                    c.Map(x => x.PhoneNumber);
                    c.Map(x => x.Email);
                });
        }
    }
}
