﻿using System.Collections.Generic;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Dto;

namespace HSEvents.Server.Api.Cities
{
    public interface ICityService
    {
        IEnumerable<CityDto> GetAll(CityArgs args);
        CityDto Get(long id);
        CityDto Add(CityDto subject);
        void Update(CityDto subject);
        void Delete(long id);
        void Delete(long[] ids);
    }

    public class CityService : ICityService
    {
        private readonly ICityStorage cityStorage;

        public CityService(ICityStorage cityStorage)
        {
            this.cityStorage = cityStorage;
        }
        
        public IEnumerable<CityDto> GetAll(CityArgs args)
        {
           return cityStorage.GetAllDtos(args);
        }

        public CityDto Get(long id)
        {
            return cityStorage.Get(id);
        }

        public CityDto Add(CityDto subject)
        {
            return cityStorage.Add(subject);
        }

        public void Update(CityDto subject)
        {
            cityStorage.Update(subject);
        }

        public void Delete(long id)
        {
            cityStorage.Delete(id);
        }

        public void Delete(long[] ids)
        {
            cityStorage.Delete(ids);
        }
    }
}
