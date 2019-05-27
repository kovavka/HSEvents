using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Domain.Events;
using Domain.IEntity;
using FluentNHibernate.Conventions;
using Helpers;
using Infrastructure.Repositories.Dto;
using NHibernate;
using NHibernate.Linq;

namespace Infrastructure.Repositories
{
    public interface IUserRepository
    {
        User Login(string login, string password);
        Attendee SignUp(AttendeeDto dto);
        User Login(string login);
        bool Exists(string login);
        Employee GetEmployee(long userId);
        AttendeeDto GetAttendee(long userId);
    }

    public class UserRepository : IUserRepository, IDisposable
    {
        private ISession session = NHibernateHelper.OpenSession();

        public User Login(string login, string password)
        {
            return session.Query<User>()
                .Where(x => x.Login == login)
                .ToList()
                .FirstOrDefault(x => PasswordHelper.VerifyHashedPassword(x.Password, password));
        }

        public Employee GetEmployee(long userId)
        {
            return session.Query<Employee>()
                .FirstOrDefault(x => x.User.Id == userId);
        }

        public AttendeeDto GetAttendee(long userId)
        {
            var attendee = session.Query<Attendee>()
                .FirstOrDefault(x => x.User.Id == userId);

            if (attendee == null)
                return null;

            return ToDto(attendee);
        }

        public IEnumerable<AttendeeDto> GetAllAttendees()
        {
            var attendees = session.Query<Attendee>().AsEnumerable();


            return attendees.Select(ToDto).ToList();
        }

        public IEnumerable<AttendeeDto> GetAllAttendees(long eventId)
        {
            var attendees = session.Query<Event>()
                .FirstOrDefault(x=>x.Id==eventId)
                .AttendanceInfo
                .Select(x=>x.Attendee)
                .AsEnumerable();


            return attendees.Select(ToDto).ToList();
        }

        public User Login(string login)
        {
            return session.Query<User>()
                .FirstOrDefault(x => x.Login == login);
        }

        public Attendee SignUp(AttendeeDto dto)
        {
            var pupil = dto.Type == AttendeeType.Pupil ? FindPupil(dto) : null;
            if (pupil != null)
            {
                SetAttendeeInfo(pupil, dto);
                SetPupilInfo(pupil, dto);

                using (var tx = session.BeginTransaction())
                {
                    session.Update(pupil);
                    tx.Commit();
                }

                return pupil;
            }
            
            var entity = ToEntity(dto);
            using (var tx = session.BeginTransaction())
            {
                session.Save(entity);
                tx.Commit();
            }

            return entity;
        }

        public void AddAttendee(AttendeeDto dto)
        {
            var entity = ToEntity(dto);
            using (var tx = session.BeginTransaction())
            {
                session.Save(entity);
                tx.Commit();
            }
        }

        public void UpdateAttendee(AttendeeDto dto)
        {
            var attendee = session.Query<Attendee>().FirstOrDefault(x => x.Id == dto.Id);
            var userInfo = attendee.User;

            if (dto.Type == AttendeeType.Pupil)
            {
                var pupil = attendee as Pupil;
                SetPupilInfo(pupil, dto);

                attendee = pupil;
            }

            SetAttendeeInfo(attendee, dto);
            attendee.User = userInfo;

            using (var tx = session.BeginTransaction())
            {
                session.Update(attendee);
                tx.Commit();
            }
        }

        private Attendee ToEntity(AttendeeDto dto)
        {
            var entity = dto.Type == AttendeeType.Pupil
                ? CreatePupil(dto)
                : new Attendee();

            SetAttendeeInfo(entity, dto);

            return entity;
        }

        private AttendeeDto ToDto(Attendee entity)
        {
            var dto = new AttendeeDto()
            {
                Id = entity.Id,
                FullName = entity.ContactInfo.FullName,
                PhoneNumber = entity.ContactInfo.PhoneNumber,
                Email = entity.ContactInfo.Email,
                Type = entity.Type,
            };

            if (entity.Type == AttendeeType.Pupil)
            {
                var pupil = entity as Pupil;
                dto.YearOfGraduation = pupil.YearOfGraduation;
                dto.Sex = pupil.Sex;
                dto.SchoolId = pupil.School.Id;
            }
            

            return dto;
        }

        private Pupil CreatePupil(AttendeeDto dto)
        {
            var pupil = new Pupil();
            SetPupilInfo(pupil, dto);

            return pupil;
        }

        private void SetPupilInfo(Pupil pupil, AttendeeDto dto)
        {
            pupil.School = session.Query<School>().FirstOrDefault(x => x.Id == dto.SchoolId);
            pupil.InterestingPrograms = session.Query<AcademicProgram>()
                .Where(x => dto.InterestingProgramIds.Contains(x.Id)).ToList();
            pupil.Sex = dto.Sex;
            pupil.YearOfGraduation = dto.YearOfGraduation;
        }

        private void SetAttendeeInfo(Attendee attendee, AttendeeDto dto)
        {
            attendee.Type = dto.Type;
            if (dto.Login.IsNotEmpty())
            {
                attendee.User = new User()
                {
                    Login = dto.Login,
                    Password = PasswordHelper.GetHash(dto.Password),
                    Type = UserType.Attendee
                };
            }
            attendee.ContactInfo = new ContactInfo(dto.FullName, dto.PhoneNumber, dto.Email);
        }

        private Pupil FindPupil(AttendeeDto dto)
        {
            return session.Query<Pupil>()
                .FirstOrDefault(x => x.ContactInfo.FullName == dto.FullName
                                     && x.ContactInfo.PhoneNumber == dto.PhoneNumber);
        }

        public bool Exists(string login)
        {
            return session.Query<User>().Any(x => x.Login == login);
        }

        public void Dispose()
        {
            session.Close();
        }
    }
}
