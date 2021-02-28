using Newtonsoft.Json.Linq;
namespace AcryGen.Models
{
    public class GeneratorViewModel
    {

        public string jsonString { get; set; }
        public string acronym { get; set; }

        public bool noSwears { get; set; }

        public GeneratorViewModel(string jsonString)
        {
            this.jsonString = jsonString;
        }

        //fill object values based on the passed json string
        public void fillValues()
        {
            var jsonObject = JObject.Parse(jsonString);
            this.acronym = (string)jsonObject["acronym"];
            this.noSwears = (bool)jsonObject["noSwears"];
        }
    }
}
