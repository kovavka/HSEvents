using Domain.IEntity;

namespace Domain
{
    public class Address: Entity
    {
        public virtual string House { get; set; }

        public virtual Street Street { get; set; }

        public virtual Country Country
        {
            get { return Region.Country; }
        }

        public virtual Region Region
        {
            get { return City.Region; }
        }

        public virtual CityType CityType
        {
            get { return City.CityType; }
        }

        public virtual City City
        {
            get { return Street.City; }
        }

        
        public virtual string FullAddress
        {
            get
            {
                return string.Format("{0}, {1}, {2} {3}, {4}, {5}",
                    Country.Name,
                    Region.Name,
                    CityType.Name,
                    City.Name,
                    Street.Name,
                    House);
            }
        }
    }

    
    public class Country : NamedEntity
    {
    }

    public class Region : NamedEntity
    {
        public virtual Country Country { get; set; }
    }

    public class CityType : NamedEntity
    {
    }

    public class City : NamedEntity
    {
        public virtual CityType CityType { get; set; }
        public virtual Region Region { get; set; }
    }

    public class Street : NamedEntity
    {
        public virtual City City { get; set; }
    }

}
