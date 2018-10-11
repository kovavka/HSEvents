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
    }
}
