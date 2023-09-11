using GeradorDePDF.Domain.Enums;
using Microsoft.AspNetCore.Http;

namespace GeradorDePDF.Domain.Models.Requests;

public class CsvPdfRequestModel
{
    public IFormFile? File { get; set; }
    public EncodingType EncodingType { get; set; }
    public PageOrientationType PageOrientationType { get; set; }
    public string Delimitador { get; set; }
}
