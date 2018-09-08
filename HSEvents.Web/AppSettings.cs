using System.Web.Configuration;
using Newtonsoft.Json;

namespace HSEvents
{
    public class AppSettings
    {
        public static string DefaultConnection => WebConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
       
    }
}