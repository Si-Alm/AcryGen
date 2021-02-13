﻿using System;
using System.IO;
using AcryGen.Controllers;
using Microsoft.Extensions.Logging;

namespace AcryGen.Models
{
    public class AcGenerator
    {

        private readonly ILogger<AcGenerator> logger;

        public AcGenerator(ILogger<AcGenerator> logger)
        {
            this.logger = logger;
        }

        public char[] getLetters(string acronym)
        {
            char[] letters = acronym.ToCharArray();

            return letters;
        }

        public string[] getAcronym(string acronym)
        {
            var letters = getLetters(acronym);
            string fullString = "";
            string formattedAcronym = "";

            for (var i = 0; i < letters.Length; i++)
            {
                var path = "Models/Dictionary/" + letters[i] + ".txt";
                var lines = File.ReadAllLines(path);
                var ran = new Random().Next(0, lines.Length - 1);
                string line = lines[ran];
                fullString = fullString + char.ToUpper(line[0]) + line.Substring(1) + " ";
                formattedAcronym = formattedAcronym + char.ToUpper(letters[i]);

                if(i != letters.Length - 1)
                {
                    formattedAcronym = formattedAcronym + ".";
                }
            }

            


            string[] fullAcronym = { fullString, formattedAcronym };

            return fullAcronym;
        }
    }
}
