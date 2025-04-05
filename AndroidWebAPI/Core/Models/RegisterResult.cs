using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class RegisterResult
    {
        public bool Succeeded { get; set; }
        public IEnumerable<string> Errors { get; set; }
        public string Token { get; set; }
    }
}
