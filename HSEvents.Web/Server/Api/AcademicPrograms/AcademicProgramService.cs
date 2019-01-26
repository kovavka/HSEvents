using System.Collections.Generic;
using Domain;

namespace HSEvents.Server.Api.AcademicPrograms
{
    public interface IAcademicProgramService
    {
        IEnumerable<AcademicProgram> GetAll();
        AcademicProgram Get(long id);
        AcademicProgram Add(AcademicProgram subject);
        void Update(AcademicProgram subject);
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

        public AcademicProgram Add(AcademicProgram subject)
        {
            return academicProgramStorage.Add(subject);
        }

        public void Update(AcademicProgram subject)
        {
            academicProgramStorage.Update(subject);
        }

        public void Delete(long id)
        {
            academicProgramStorage.Delete(id);
        }
    }
}
