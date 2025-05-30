using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Core.Models
{
    public class RegisterModel
    {
        public string username { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public IFormFile? image { get; set; }
    }
}
