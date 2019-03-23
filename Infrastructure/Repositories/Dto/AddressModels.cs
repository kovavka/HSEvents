
using Domain;

namespace Infrastructure.Repositories.Dto
{
    public class AddressDto
    {
        public long Id { get; set; }
        public string Caption { get; set; }
        public string ShortName { get; set; }
        public string House { get; set; }
        public long StreetId { get; set; }
    }

    public class StreetDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public City City { get; set; }
        public string AreaName { get; set; }
    }

    public class CityDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public CityType CityType { get; set; }
        public Region Region { get; set; }
        public string AreaName { get; set; }
    }
}