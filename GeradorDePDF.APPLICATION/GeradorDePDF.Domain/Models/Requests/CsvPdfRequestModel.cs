using GeradorDePDF.Domain.Enums;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Converters;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GeradorDePDF.Domain.Models.Requests;

public class CsvPdfRequestModel
{
    public IFormFile? File { get; set; }
    public EncodingType EncodingType { get; set; }
    public string Delimitador { get; set; }
}
