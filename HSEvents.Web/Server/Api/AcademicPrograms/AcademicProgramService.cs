using System.Collections.Generic;
using Domain;

namespace HSEvents.Server.Api.AcademicPrograms
{
    public interface IAcademicProgramService
    {
        IEnumerable<AcademicProgram> GetAll();
        AcademicProgram Get(long id);
        AcademicProgram Add(AcademicProgram program);
        void Update(AcademicProgram program);
        void Delete(long id);
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

        public AcademicProgram Get(long id)
        {
            return academicProgramStorage.Get(id);
        }

        public AcademicProgram Add(AcademicProgram program)
        {
            return academicProgramStorage.Add(program);
        }

        public void Update(AcademicProgram program)
        {
            academicProgramStorage.Update(program);
        }

        public void Delete(long id)
        {
            academicProgramStorage.Delete(id);
        }
    }
}
