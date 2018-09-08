using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Hosting;
using System.Web.Http;

namespace HSEvents.Controllers
{
    [AllowAnonymous]
    public class HomeController : ApiController
    {
        private const string HtmlTemplatePath = "~/Data/index-dev.html";

        [HttpGet]
        public HttpResponseMessage Index()
        {
            var filePath = HostingEnvironment.MapPath(HtmlTemplatePath);
            var indexContentTemplate = File.ReadAllText(filePath);

            var response = new HttpResponseMessage();
            response.Content = new StringContent(indexContentTemplate);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/html");
            return response;
        }
    }
}
