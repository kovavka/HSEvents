using System;
using System.Web;
using System.Web.Http;
using HSEvents.Server.Api.AcademicPrograms;
using HSEvents.Server.Api.Addresses;
using HSEvents.Server.Api.Cities;
using HSEvents.Server.Api.CityTypes;
using HSEvents.Server.Api.Countries;
using HSEvents.Server.Api.Departments;
using HSEvents.Server.Api.Employees;
using HSEvents.Server.Api.Empty;
using HSEvents.Server.Api.Events;
using HSEvents.Server.Api.Groups;
using HSEvents.Server.Api.Regions;
using HSEvents.Server.Api.Reports;
using HSEvents.Server.Api.Schools;
using HSEvents.Server.Api.SchoolTypes;
using HSEvents.Server.Api.Streets;
using HSEvents.Server.Api.Subjects;
using HSEvents.Server.Api.Users;
using HSEvents.Server.Api.Volunteers;
using HSEvents.Server.Auth;
using Infrastructure;
using Infrastructure.Repositories;
using Microsoft.Practices.Unity;
using Newtonsoft.Json.Serialization;
using Unity.WebApi;
using IStorage = HSEvents.Server.Api.Empty.IStorage;

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

            NHibernateHelper.Configure(AppSettings.DefaultConnection);
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
            container.RegisterType<IGroupService, GroupService>();
            container.RegisterType<IGroupStorage, GroupStorage>();
            container.RegisterType<IAcademicProgramStorage, AcademicProgramStorage>();
            container.RegisterType<IAcademicProgramService, AcademicProgramService>();
            container.RegisterType<ISchoolStorage, SchoolStorage>();
            container.RegisterType<ISchoolService, SchoolService>();
            container.RegisterType<ISchoolTypeStorage, SchoolTypeStorage>();
            container.RegisterType<ISchoolTypeService, SchoolTypeService>();
            container.RegisterType<IStreetStorage, StreetStorage>();
            container.RegisterType<IStreetService, StreetService>();
            container.RegisterType<ICityStorage, CityStorage>();
            container.RegisterType<ICityService, CityService>();
            container.RegisterType<ICityTypeStorage, CityTypeStorage>();
            container.RegisterType<ICityTypeService, CityTypeService>();
            container.RegisterType<IRegionStorage, RegionStorage>();
            container.RegisterType<IRegionService, RegionService>();
            container.RegisterType<ICountryStorage, CountryStorage>();
            container.RegisterType<ICountryService, CountryService>();
            container.RegisterType<IUserStorage, UserStorage>();
            container.RegisterType<IUserService, UserService>();
            container.RegisterType<IStatisticStorage, StatisticStorage>();
            container.RegisterType<IStatisticService, StatisticService>();

            container.RegisterType<IStorage, Storage>();
            container.RegisterType<IService, Service>();

            container.RegisterType<IAuthService, AuthService>();
            container.RegisterType<IUserRepository, UserRepository>();

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