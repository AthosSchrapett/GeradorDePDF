using GeradorDePDF.Domain.Models;
using GeradorDePDF.Domain.Models.Requests;
using Microsoft.AspNetCore.Http;

namespace GeradorDePDF.Domain.Services.Interfaces;

public interface IPdfService
{
    public Task<byte[]> GeraPdf(IFormFile file);
    public Task<byte[]> GeraPdf(ModelPdf model);
    public Task<byte[]> SplitPdf(PdfRequestModel model);
    public Task<byte[]> JoinPdf(IEnumerable<IFormFile> files, List<string> paginas);
    public Task<byte[]> GeraPdfWithCsv(CsvPdfRequestModel model);
}
