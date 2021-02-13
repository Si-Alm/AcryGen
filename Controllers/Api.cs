using System.Text.RegularExpressions;
using AcryGen.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AcryGen.Controllers
{
    [Route("/api")]
    public class Api : Controller
    {
        private readonly ILogger _logger;
        private AcGenerator generator;

        public Api(ILogger<AcGenerator> _logger)
        {
            this._logger = _logger;
            this.generator = new AcGenerator(_logger);
        }

        [HttpPost]
        [Route("/api/acronym")]
        public JsonResult Acronym([FromBody] string passedAcronym)
        {
            string acronym = passedAcronym;//Regex.Replace(passedAcronym, "[^0-9a-zA-Z]+", "");
            string[] fullAcronym = generator.getAcronym(acronym);

            return Json(new { phrase = fullAcronym[0], acronym = fullAcronym[1] });
        }
    }
}
