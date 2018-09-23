using System;
using System.Web;
using System.Web.Http;
using Infrastructure;
using Microsoft.Practices.Unity;
using Newtonsoft.Json.Serialization;
using Unity.WebApi;

namespace HSEvents
{
    public class Global : HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            var container = new UnityContainer();
            RegisterUnityComponents(container);

            GlobalConfiguration.Configure(config =>
            {
                config.MapHttpAttributeRoutes();

                config.Routes.MapHttpRoute(
                    name: "AdminApi",
                    routeTemplate: "api/admin/{controller}/{action}"
                );

                config.Routes.MapHttpRoute(
                    name: "DefaultApi",
                    routeTemplate: "api/{controller}/{action}"
                );

                config.Routes.MapHttpRoute(
                    name: "Index",
                    routeTemplate: "{controller}/{action}",
                    defaults: new {controller = "Home", action = "Index"}
                );

                var jsonFormatter = config.Formatters.JsonFormatter;
                jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                jsonFormatter.UseDataContractJsonSerializer = false;

            });

            NHibernateHelper.Configure();
        }

        private void RegisterUnityComponents(UnityContainer container)
        {
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }

        protected void Application_End(object sender, EventArgs e)
        {
        }
    }
}