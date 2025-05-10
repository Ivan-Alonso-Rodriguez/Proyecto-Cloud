using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VetImagesService.Services
{
    public class ImageStorageService
    {
        private readonly IMongoDatabase _database;
        private readonly GridFSBucket _bucket;

        public ImageStorageService()
        {
            var client = new MongoClient("mongodb://172.31.21.115:27017");
            _database = client.GetDatabase("VetImagesDb");
            _bucket = new GridFSBucket(_database);
        }

        // Subir imagen con metadata (consultaId)
        public async Task<string> SaveImageAsync(IFormFile file, string consultaId)
        {
            var options = new GridFSUploadOptions
            {
                Metadata = new BsonDocument
                {
                    { "contentType", file.ContentType },
                    { "consultaId", consultaId }
                }
            };

            using var stream = file.OpenReadStream();
            var id = await _bucket.UploadFromStreamAsync(file.FileName, stream, options);
            return id.ToString();
        }

        // Obtener imagen por id
        public async Task<(System.IO.Stream Stream, string ContentType)?> GetImageAsync(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
                return null;
        
            try
            {
                var filter = Builders<GridFSFileInfo>.Filter.Eq("_id", objectId);
                var fileInfo = await _bucket.Find(filter).FirstOrDefaultAsync();

                if (fileInfo == null) return null;
        
                var stream = await _bucket.OpenDownloadStreamAsync(objectId);
        
                string contentType = "application/octet-stream";
        
                if (fileInfo.Metadata != null && fileInfo.Metadata.TryGetValue("contentType", out var ct) && ct.IsString)
                {
                    contentType = ct.AsString;
                }
        
                return (stream, contentType);
            }
            catch
            {
                return null; // evita romper la API
            }
        }



        // Obtener todas las imágenes asociadas a un consultaId
        public async Task<IEnumerable<object>> GetImagesByConsultaIdAsync(string consultaId)
        {
            var filter = Builders<GridFSFileInfo>.Filter.Eq("metadata.consultaId", consultaId);
            using var cursor = await _bucket.FindAsync(filter);
            var files = await cursor.ToListAsync();

            return files.Select(f => new
            {
                id = f.Id.ToString(),
                contentType = f.Metadata.GetValue("contentType", BsonNull.Value).AsString
            });
        }

        // Eliminar imagen por ID
        public async Task DeleteImageAsync(string id)
        {
            if (ObjectId.TryParse(id, out var objId))
            {
                await _bucket.DeleteAsync(objId);
            }
        }
    }
}
