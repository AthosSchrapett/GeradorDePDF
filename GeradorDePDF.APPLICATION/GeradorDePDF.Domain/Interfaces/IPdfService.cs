using GeradorDePDF.Domain.Models;
using GeradorDePDF.Domain.Models.Requests;
using Microsoft.AspNetCore.Http;

namespace GeradorDePDF.Domain.Services.Interfaces;

public interface IPdfService
{
    public byte[] GeraPdf(IFormFile file);
    public byte[] GeraPdf(ModelPdf model);
    public byte[] SplitPdf(PdfRequestModel model);
    public byte[] JoinPdf(IEnumerable<IFormFile> files, List<string> paginas);
    public byte[] GeraPdfWithCsv(CsvPdfRequestModel model);
}
