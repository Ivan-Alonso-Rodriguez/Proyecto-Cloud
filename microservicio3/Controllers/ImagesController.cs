using System.IO;
using Microsoft.AspNetCore.Mvc;
using VetImagesService.Models;
using VetImagesService.Services;

namespace VetImagesService.Controllers;

[ApiController]
[Route("[controller]")]
public class ImagesController : ControllerBase
{
    private readonly ImageStorageService _service;
    public ImagesController(ImageStorageService service) => _service = service;

    using VetImagesService.Models;

    [HttpPost("upload")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Upload([FromForm] UploadImageRequest request)
    {
        if (request.File == null || request.File.Length == 0)
            return BadRequest("Archivo vacío");
    
        var id = await _service.SaveImageAsync(request.File, request.ConsultaId);
        return Ok(new { id });
    }



    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id)
    {
        var result = await _service.GetImageAsync(id);
        if (result == null) return NotFound();
        var (stream, contentType) = result.Value;
        return File(stream, contentType, enableRangeProcessing: true);

    }

    [HttpGet("consulta/{consultaId}")]
    public async Task<IActionResult> GetImagesByConsulta(string consultaId)
    {
        var images = await _service.GetImagesByConsultaIdAsync(consultaId);
        return Ok(images);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteImage(string id)
    {
        await _service.DeleteImageAsync(id);
        return Ok(new { deleted = true });
    }


}
