using Newtonsoft.Json;
using System.Configuration;
using System.IO;
using System.Web.Hosting;
using System.Web.Configuration;
namespace CostsWeb.Server
{
    public class AppSettings
    {
        public static string AppUrl => WebConfigurationManager.AppSettings["AppUrl"];

        public static string PendingPurchasesServiceBaseUrl => ConfigurationManager.AppSettings["PendingPurchasesService.BaseUrl"];
		public static string SuppliersServiceUrl => WebConfigurationManager.AppSettings["SuppliersServiceUrl"];
		public static string NotificationTzUrl => WebConfigurationManager.AppSettings["NotificationTzUrl"];
        public static string EisIntegrationOrganizationServiceUrl => WebConfigurationManager.AppSettings["EisIntegrationOrganizationServiceUrl"];
    }
}