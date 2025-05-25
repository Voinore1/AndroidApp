using Microsoft.AspNetCore.Http;

namespace Core.Interfaces;

public interface IFileService
{
    Task<string> SaveImage(IFormFile file);
    Task<string> EditImage(IFormFile file, string path);
    void DeleteImage(string path);
    Task<IList<string>> SaveImages(List<IFormFile> files);
    Task<IList<string>> EditImages(List<IFormFile> files, IList<string> paths);
}