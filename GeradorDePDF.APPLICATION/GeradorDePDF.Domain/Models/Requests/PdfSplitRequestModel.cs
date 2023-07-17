using Microsoft.AspNetCore.Http;

namespace GeradorDePDF.Domain.Models.Requests;

public class PdfSplitRequestModel
{
    public List<IFormFile>? Files { get; set; }
    public IEnumerable<string>? Ranges { get; set; }
}
