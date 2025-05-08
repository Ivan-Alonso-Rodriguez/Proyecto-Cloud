using Microsoft.AspNetCore.Http;

namespace VetImagesService.Models
{
    public class UploadImageRequest
    {
        public IFormFile File { get; set; }
        public string ConsultaId { get; set; }
    }
}
