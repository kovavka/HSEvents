using System.Collections.Generic;
using System.Linq;
using Domain;
using Infrastructure.Repositories;

namespace HSEvents.Server.Api.AcademicPrograms
{
    public interface IAcademicProgramStorage
    {
        IEnumerable<AcademicProgram> GetAll();
        AcademicProgram Get(long id);
        AcademicProgram Add(AcademicProgram program);
        void Update(AcademicProgram program);
        void Delete(long id);
    }

    public class AcademicProgramStorage : SimpleEntityStorage<AcademicProgram>, IAcademicProgramStorage
    {
        public IEnumerable<AcademicProgram> GetAll()
        {
            using (var repo = new NHGetAllRepository<AcademicProgram>())
            {
                return repo.GetAll().AsEnumerable();
            }
        }
    }
}
