using System.Collections.Generic;
using Domain.Events;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Subjects
{
    public interface ISubjectService
    {
        IEnumerable<Subject> GetAll();
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
    }
}
