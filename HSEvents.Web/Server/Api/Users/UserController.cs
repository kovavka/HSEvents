using System.Collections.Generic;
using System.Web.Http;
using Domain;
using Domain.IEntity;
using HSEvents.Server.Api.Empty;
using HSEvents.Server.Auth;

namespace HSEvents.Server.Api.Users
{
    public class UserController : ApiController
    {
        private readonly IUserService userService;
        private readonly IAuthService authService;
        public UserController(IUserService userService, IAuthService authService)
        {
            this.userService = userService;
            this.authService = authService;
        }

        [HttpPost]
        public AuthInfo Login(AuthArgs authInfo)
        {
            //todo нужно сделать нормальное решение
            authService.ActionContext = ActionContext;
            return authService.Login(authInfo);
        }
    }
}