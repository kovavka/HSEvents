using System.Web.Http;
using HSEvents.Server.Auth;
using Infrastructure.Repositories.Dto;

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

        [HttpPost]
        public AuthInfo SignUp(AttendeeDto dto)
        {
            return authService.SignUp(dto);
        }
    }
}