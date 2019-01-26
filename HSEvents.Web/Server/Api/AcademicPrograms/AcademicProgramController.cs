using System.Collections.Generic;
using System.Web.Http;
using Domain;

namespace HSEvents.Server.Api.AcademicPrograms
{
    [AllowAnonymous]
    public class AcademicProgramController : ApiController
    {
        private readonly IAcademicProgramService academicProgramService;
        public AcademicProgramController(IAcademicProgramService academicProgramService)
        {
            this.academicProgramService = academicProgramService;
        }

        [HttpGet]
        public IEnumerable<AcademicProgram> GetAll()
        {
            return academicProgramService.GetAll();
        }

        [HttpGet]
        public AcademicProgram Get(long id)
        {
            return academicProgramService.Get(id);
        }

        [HttpPut]
        public AcademicProgram Add(AcademicProgram subject)
        {
            return academicProgramService.Add(subject);
        }

        [HttpPut]
        public void Update(AcademicProgram subject)
        {
            academicProgramService.Update(subject);
        }

        [HttpPost]
        public void Delete([FromBody] long id)
        {
            academicProgramService.Delete(id);
        }
    }
}
