using System.Collections.Generic;
using Domain;

namespace HSEvents.Server.Api.AcademicPrograms
{
    public interface IAcademicProgramService
    {
        IEnumerable<AcademicProgram> GetAll();
    }

    public class AcademicProgramService : IAcademicProgramService
    {
        private readonly IAcademicProgramStorage academicProgramStorage;

        public AcademicProgramService(IAcademicProgramStorage academicProgramStorage)
        {
            this.academicProgramStorage = academicProgramStorage;
        }
        
        public IEnumerable<AcademicProgram> GetAll()
        {
           return academicProgramStorage.GetAll();
        }
    }
}
