using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Entities;

namespace Core.Interfaces
{
    public interface IAuthService
    {
        Task<RegisterResult> RegisterAsync(RegisterModel model, IFileService fileService);
        Task<LoginResult> LoginAsync(LoginModel model);
        Task<User> GetUserInfoAsync(string userEmail);
    }
}
