using Domain.IEntity;

namespace Domain
{
    public class Result : Entity
    {
        public virtual Pupil Pupil { get; set; }
        public virtual int NumberOfPoints { get; set; }
        public virtual ResultType Type { get; set; }
    }

    public class ResultType : NamedEntity
    {
    }
}
