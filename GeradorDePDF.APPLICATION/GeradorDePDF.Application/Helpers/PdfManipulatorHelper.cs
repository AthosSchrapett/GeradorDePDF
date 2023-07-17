using GeradorDePDF.Application.Util;
using iText.Kernel.Pdf;
using iText.Kernel.Utils;
using Microsoft.AspNetCore.Http;

namespace GeradorDePDF.Application.Helpers;

public class PdfManipulatorHelper
{
    public static string SeparaPdf(IFormFile file, string range)
    {
        string caminho = Path.Combine(Path.GetTempPath(), $"temporary-{Guid.NewGuid()}.pdf");

        Stream stream = file.OpenReadStream();
        PdfDocument pdf = new(new PdfReader(stream));

        PdfSplit pdfSplit = new(pdf, caminho);
        PdfDocument result = pdfSplit.ExtractPageRange(new PageRange(range));
        result.Close();

        return caminho;
    }
}
