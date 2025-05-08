using VetImagesService.Services;

var builder = WebApplication.CreateBuilder(args);

// Servicios
builder.Services.AddSingleton<ImageStorageService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "VetImagesService",
        Version = "v1"
    });

    // 👇 ESTA LÍNEA ES LA CLAVE PARA EL ERROR DE IFormFile
    c.MapType<IFormFile>(() => new Microsoft.OpenApi.Models.OpenApiSchema
    {
        Type = "string",
        Format = "binary"
    });
});


var app = builder.Build();

// Middlewares
// Mostrar Swagger SIEMPRE (desarrollo y producción)
app.UseSwagger();
app.UseSwaggerUI();


app.UseAuthorization();
app.MapControllers();
app.Run();
