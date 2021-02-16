using System;
using System.IO;
using AcryGen.Controllers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;

namespace AcryGen.Models
{
    public class AcGenerator
    {

        private readonly ILogger<AcGenerator> logger;
        private IWebHostEnvironment environmentPath;

        //simple constructor
        public AcGenerator(ILogger<AcGenerator> logger, IWebHostEnvironment environmentPath)
        {
            this.logger = logger;
            this.environmentPath = environmentPath;
        }

        //get the individual letters of a passed acronym
        public char[] getLetters(string acronym)
        {
            char[] letters = acronym.ToCharArray();

            return letters;
        }

        //function for actually getting the acronym
        //all it does is loop through the letters of the acronym, pull a word for each letter by accessing its respective file
        //  and pulling the value of a random line, then adding it to the full phrase string
        //
        //it returns the full generate phrase, as well as the formatted acronym
        public string[] getAcronym(string acronym)
        {
            var letters = getLetters(acronym);
            string fullString = "";
            string formattedAcronym = "";

            for (var i = 0; i < letters.Length; i++)
            {
                var path = $"{environmentPath.ContentRootPath}/Dictionary/" + char.ToLower(letters[i]) + ".txt";
                var lines = File.ReadAllLines(path);
                var ran = new Random().Next(0, lines.Length - 1);
                string line = lines[ran];
                fullString = fullString + char.ToUpper(line[0]) + line.Substring(1) + " ";
                formattedAcronym = formattedAcronym + char.ToUpper(letters[i]);

                if (i != letters.Length - 1)
                {
                    formattedAcronym = formattedAcronym + ".";
                }
            }


            string[] fullAcronym = { fullString, formattedAcronym };

            return fullAcronym;
        }
    }
}
