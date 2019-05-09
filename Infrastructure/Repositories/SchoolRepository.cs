using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories.Dto;
using NHibernate.Linq;

namespace Infrastructure.Repositories
{
    public class SchoolRepository : NHDtoRepository<School, SchoolDto>
    {
        public override IEnumerable<SchoolDto> GetAllDtos()
        {
            return GetAll().AsEnumerable().Select(ConvertToDto);
        }

        public IEnumerable<SchoolDto> GetAllDtos(SchoolArgs args)
        {
            var query = GetAll();

            if (args.CityId.HasValue)
                query = query.Where(x => x.Addresses.Any(a => a.Street.City.Id == args.CityId.Value));

            return query.AsEnumerable().Select(ConvertToDto).ToList();
        }

        protected override IQueryable<School> GetAllQuery()
        {
            return base.GetAllQuery()
                .FetchMany(x => x.Addresses)
                    .ThenFetch(x => x.Street)
                    .ThenFetch(x => x.City)
                    .ThenFetch(x => x.Region)
                    .ThenFetch(x => x.Country)
                .FetchMany(x => x.Addresses)
                    .ThenFetch(x => x.Street)
                    .ThenFetch(x => x.City)
                    .ThenFetch(x => x.CityType)
                .Fetch(x => x.Type);
        }

        //todo бред, надо сделать нормальный маппинг
        public override void Delete(long id)
        {
            using (var session = NHibernateHelper.OpenSession())
            using (var tx = session.BeginTransaction())
            {
                var addresses = session.Query<School>()
                    .First(x => x.Id == id)
                    .Addresses;

                foreach (var address in addresses)
                {
                    address.School = null;
                    session.Save(address);
                }
                tx.Commit();
            }

            base.Delete(id);
        }

        protected override SchoolDto ConvertToDto(School entity)
        {
            return new SchoolDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                Type = entity.Type,
                Number = entity.Number,
                BelongToUniversityDistrict = entity.BelongToUniversityDistrict,
                HasPriority = entity.HasPriority,
                Addresses = entity.Addresses.Select(a => new AddressDto
                {
                    Id = a.Id,
                    Street = a.Street,
                    House = a.House
                }).ToList(),
                Contacts = entity.Contacts.ToList()
            };
        }

        protected override School ConvertToEntity(SchoolDto dto)
        {
            return new School()
            {
                Id = dto.Id,
                Name = dto.Name,
                Type = RepositoryHelper.GetAnotherEntity(dto.Type),
                Number = dto.Number,
                BelongToUniversityDistrict = dto.BelongToUniversityDistrict,
                HasPriority = dto.HasPriority,
                Addresses = GetAddresses(dto.Addresses.Select(x => x.Id).ToList()),
                Contacts = RepositoryHelper.GetAnotherEntity<ContactPerson>(dto.Contacts.Select(x => x.Id)).ToList()
            };
        }

        //todo надо как-то решить проблему с сессией, потому что это полный бред, сохранять надо внутри одной сессии, + это очень неэффективно по памяти
        private List<Address> GetAddresses(List<long> ids)
        {
            using (var session = NHibernateHelper.OpenSession())
            {
                var query = session.Query<Address>().Where(x => ids.Contains(x.Id));

                session.Query<Address>().Where(x => ids.Contains(x.Id))
                    .Fetch(x => x.Street)
                    .ThenFetch(x => x.City)
                    .ThenFetch(x => x.Region)
                    .ThenFetch(x => x.Country).ToList();

                session.Query<Address>().Where(x => ids.Contains(x.Id))
                    .Fetch(x => x.Street)
                    .ThenFetch(x => x.City)
                    .ThenFetch(x => x.CityType).ToList();

                return query.ToList();
            }
        }
    }

    public class SchoolArgs
    {
        public long? CityId { get; set; }
        public string Limit { get; set; }
        public string Offset { get; set; }
    }
}
