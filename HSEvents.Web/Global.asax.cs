﻿using System;
using System.Web;
using System.Web.Http;
using HSEvents.Server.Api.Addresses;
using HSEvents.Server.Api.Departments;
using HSEvents.Server.Api.Employees;
using HSEvents.Server.Api.Empty;
using HSEvents.Server.Api.Events;
using HSEvents.Server.Api.Subjects;
using HSEvents.Server.Api.Volunteers;
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
                jsonFormatter.SerializerSettings.ContractResolver = new NHibernateContractResolver();
                jsonFormatter.UseDataContractJsonSerializer = false;

            });

            NHibernateHelper.Configure();
        }

        private void RegisterUnityComponents(UnityContainer container)
        {
            container.RegisterType<IEventsService, EventsService>();
            container.RegisterType<IEventsStorage, EventsStorage>();
            container.RegisterType<IAddressService, AddressService>();
            container.RegisterType<IAddressStorage, AddressStorage>();
            container.RegisterType<ISubjectStorage, SubjectStorage>();
            container.RegisterType<ISubjectService, SubjectService>();
            container.RegisterType<IDepartmentStorage, DepartmentStorage>();
            container.RegisterType<IDepartmentService, DepartmentService>();
            container.RegisterType<IEmployeeStorage, EmployeeStorage>();
            container.RegisterType<IEmployeeService, EmployeeService>();
            container.RegisterType<IVolunteerStorage, VolunteerStorage>();
            container.RegisterType<IVolunteerService, VolunteerService>();

            container.RegisterType<IStorage, Storage>();
            container.RegisterType<IService, Service>();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
        private class NHibernateContractResolver : CamelCasePropertyNamesContractResolver
        {
            protected override JsonContract CreateContract(Type objectType)
            {
                if (NHibernateHelper.GetProxyType().IsAssignableFrom(objectType))
                    return base.CreateContract(objectType.BaseType);

                return base.CreateContract(objectType);
            }
        }

        protected void Application_End(object sender, EventArgs e)
        {
        }
    }
}