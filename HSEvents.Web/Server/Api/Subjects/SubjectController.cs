using System.Collections.Generic;
using System.Web.Http;
using Domain.Events;

namespace HSEvents.Server.Api.Subjects
{
    [AllowAnonymous]
    public class SubjectController : ApiController
    {
        private readonly ISubjectService subjectService;
        public SubjectController(ISubjectService subjectService)
        {
            this.subjectService = subjectService;
        }

        [HttpGet]
        public IEnumerable<Subject> GetAll()
        {
            return subjectService.GetAll();
        }

        [HttpGet]
        public Subject Get(long id)
        {
            return subjectService.Get(id);
        }

        [HttpPut]
        public Subject Add(Subject subject)
        {
            return subjectService.Add(subject);
        }

        [HttpPut]
        public void Update(Subject subject)
        {
            subjectService.Update(subject);
        }

        [HttpPost]
        public void Delete([FromBody] long id)
        {
            subjectService.Delete(id);
        }
    }
}
