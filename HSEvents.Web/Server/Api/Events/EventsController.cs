using System.Collections.Generic;
using System.Web.Http;
using HSEvents.Server.Api.Events.Models;

namespace HSEvents.Controllers
{
    [AllowAnonymous]
    public class EventsController : ApiController
    {

        [HttpGet]
        public Month GetMonth(int year, int month)
        {
            return new Month()
            {
                Name = "Сентябрь",
                Weeks = new List<Week>()
                {
                    new Week()
                    {
                        Days = new List<EventDay>
                        {
                            new EventDay()
                            {
                                Day = 27,
                                Events = new List<EventItem>()
                            },
                            new EventDay()
                            {
                                Day = 28,
                                Events = new List<EventItem>()
                            },
                            new EventDay()
                            {
                                Day = 29,
                                Events = new List<EventItem>()
                            },
                            new EventDay()
                            {
                                Day = 30,
                                Events = new List<EventItem>()
                            },
                            new EventDay()
                            {
                                Day = 31,
                                Events = new List<EventItem>()
                            },
                            new EventDay()
                            {
                                Day = 1,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 2,
                                Events = new List<EventItem>()
                            }
                        }
                    }, 
                    new Week()
                    {
                        Days = new List<EventDay>
                        {
                            new EventDay()
                            {
                                Day = 3,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 4,
                                Events = new List<EventItem>
                                {
                                    new EventItem()
                                    {
                                        Id = 4,
                                        Color = "bisque",
                                        Name = "Вышка в школы"
                                    }
                                }
                            }, 
                            new EventDay()
                            {
                                Day = 5,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 6,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 7,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 8,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 9,
                                Events = new List<EventItem>()
                            }
                        }
                    }, 
                    new Week()
                    {
                        Days = new List<EventDay>
                        {
                            new EventDay()
                            {
                                Day = 10,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 11,
                                Events = new List<EventItem>
                                {
                                    new EventItem()
                                    {
                                        Id = 1,
                                        Color = "lightgreen",
                                        Name = "Вышка в школы"
                                    },
                                    new EventItem()
                                    {
                                        Id = 2,
                                        Color = "bisque",
                                        Name = "День вышки"
                                    },
                                    new EventItem()
                                    {
                                        Id = 3,
                                        Color = "deepskyblue",
                                        Name = "Полет"
                                    }
                                }
                            }, 
                            new EventDay()
                            {
                                Day = 12,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 13,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 14,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 15,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 16,
                                Events = new List<EventItem>()
                            }
                        }
                    }, 
                    new Week()
                    {
                        Days = new List<EventDay>
                        {
                            new EventDay()
                            {
                                Day = 17,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 18,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 19,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 20,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 21,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 22,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 23,
                                Events = new List<EventItem>()
                            }
                        }
                    },  
                    new Week()
                    {
                        Days = new List<EventDay>
                        {
                            new EventDay()
                            {
                                Day = 23,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 25,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 26,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 27,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 28,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 29,
                                Events = new List<EventItem>()
                            }, 
                            new EventDay()
                            {
                                Day = 30,
                                Events = new List<EventItem>()
                            }
                        }
                    }
                }
            };
        }
    }
}
