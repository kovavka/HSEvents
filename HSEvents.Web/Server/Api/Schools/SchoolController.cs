﻿using System.Collections.Generic;
using System.Web.Http;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Schools
{
    [AllowAnonymous]
    public class SchoolController : ApiController
    {
        private readonly ISchoolService schoolService;
        public SchoolController(ISchoolService schoolService)
        {
            this.schoolService = schoolService;
        }

        [HttpGet]
        public IEnumerable<SchoolDto> GetAll([FromUri] SchoolArgs args)
        {
            return schoolService.GetAll(args);
        }

        [HttpGet]
        public SchoolDto Get(long id)
        {
            return schoolService.Get(id);
        }

        [HttpPut]
        public SchoolDto Add(SchoolDto subject)
        {
            return schoolService.Add(subject);
        }

        [HttpPut]
        public void Update(SchoolDto subject)
        {
            schoolService.Update(subject);
        }

        [HttpPost]
        public void Delete([FromBody] long id)
        {
            schoolService.Delete(id);
        }

        [HttpPost]
        public void DeleteSeveral([FromBody] long[] ids)
        {
            schoolService.Delete(ids);
        }
    }
}
