using System.Collections.Generic;
using System.Linq;
using Domain;
using Domain.Events;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Subjects
{
    public interface ISubjectStorage
    {
        IEnumerable<Subject> GetAll();
    }

    public class SubjectStorage : ISubjectStorage
    {
        public IEnumerable<Subject> GetAll()
        {
            using (var repo = new NHGetAllRepository<Subject>())
            {
                return repo.GetAll().AsEnumerable();
            }
        }
    }
}
