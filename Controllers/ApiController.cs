using System.Text.RegularExpressions;
using AcryGen.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace AcryGen.Controllers
{
    [Route("/api")]
    public class ApiController : Controller
    {
        private readonly ILogger _logger;
        private AcGenerator generator;
        private IWebHostEnvironment environmentPath;

        public ApiController(ILogger<AcGenerator> _logger, IWebHostEnvironment environmentPath)
        {
            this._logger = _logger;
            this.environmentPath = environmentPath;
            this.generator = new AcGenerator(_logger, this.environmentPath);
        }

        [HttpPost]
        [Route("/api/acronym")]
        public JsonResult Acronym([FromBody] GeneratorViewModel gvm)
        {
            //fill the object values from the json string
            gvm.fillValues();

            //make sure the acronym is formatted for the generator, generate the acronym, and return the json - plain and simple
            string acronym = Regex.Replace(gvm.acronym, "[^0-9a-zA-Z]+", "");
            string[] fullAcronym = generator.getAcronym(acronym, gvm.noSwears);

            return Json(new { phrase = fullAcronym[0], acronym = fullAcronym[1] });
        }
    }
}
