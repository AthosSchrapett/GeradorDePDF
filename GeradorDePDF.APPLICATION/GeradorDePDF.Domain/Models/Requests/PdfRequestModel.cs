using Microsoft.AspNetCore.Http;

namespace GeradorDePDF.Domain.Models.Requests;

public class PdfRequestModel
{
    public IFormFile File { get; set; }
    public IEnumerable<string>? Ranges { get; set; }
}
