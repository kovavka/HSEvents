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
    }
}
