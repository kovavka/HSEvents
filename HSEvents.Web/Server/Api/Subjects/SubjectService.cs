using System.Collections.Generic;
using Domain.Events;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Subjects
{
    public interface ISubjectService
    {
        IEnumerable<Subject> GetAll();
        Subject Get(long id);
        Subject Add(Subject entity);
        void Update(Subject entity);
        void Delete(long id);
        void Delete(long[] ids);
    }

    public class SubjectService : ISubjectService
    {
        private readonly ISubjectStorage subjectStorage;

        public SubjectService(ISubjectStorage subjectStorage)
        {
            this.subjectStorage = subjectStorage;
        }
        
        public IEnumerable<Subject> GetAll()
        {
           return subjectStorage.GetAll();
        }

        public Subject Get(long id)
        {
            return subjectStorage.Get(id);
        }

        public Subject Add(Subject subject)
        {
            return subjectStorage.Add(subject);
        }

        public void Update(Subject subject)
        {
            subjectStorage.Update(subject);
        }

        public void Delete(long id)
        {
            subjectStorage.Delete(id);
        }

        public void Delete(long[] ids)
        {
            subjectStorage.Delete(ids);
        }
    }
}
