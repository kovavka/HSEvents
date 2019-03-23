using System.Collections.Generic;
using System.Linq;
using Domain.Events;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.Subjects
{
    public interface ISubjectStorage
    {
        IEnumerable<Subject> GetAll();
        Subject Get(long id);
        Subject Add(Subject subject);
        void Update(Subject subject);
        void Delete(long id);
        void Delete(long[] ids);
    }

    public class SubjectStorage : SimpleEntityStorage<Subject>, ISubjectStorage
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
