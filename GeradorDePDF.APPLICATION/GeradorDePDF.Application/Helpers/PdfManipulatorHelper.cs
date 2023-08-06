using GeradorDePDF.Application.Util;
using GeradorDePDF.Domain.Models.Requests;
using iText.Kernel.Pdf;
using iText.Kernel.Utils;
using Microsoft.AspNetCore.Http;

namespace GeradorDePDF.Application.Helpers;

public class PdfManipulatorHelper
{
    public static PdfDocument SeparaPdf(IFormFile file, string range, ref string caminho)
    {
        Stream stream = file.OpenReadStream();
        PdfDocument pdf = new(new PdfReader(stream));

        PdfSplit pdfSplit = new(pdf, caminho);
        PdfDocument result = pdfSplit.ExtractPageRange(new PageRange(range));
        result.Close();

        return result;
    }

    public static string JuntarPdf(List<PdfRequestModel> models)
    {
        int contador = 0;
        List<PdfDocument> listaPdf = new();

        foreach (PdfRequestModel model in models)
        {
            foreach (var range in model.Ranges)
            {
                string caminhoPdf = Path.Combine(Path.GetTempPath(), $"arquivo_{contador++}.pdf");
                listaPdf.Add(SeparaPdf(model.File, range, ref caminhoPdf));
            }
        }

        string caminho = Path.Combine(Path.GetTempPath(), $"temporary.pdf");

        PdfDocument pdfDocument = new(new PdfWriter(caminho));
        PdfMerger merger = new(pdfDocument);

        foreach (var pdf in listaPdf)
        {
            merger.Merge(pdf, 1, pdf.GetNumberOfPages());

            pdf.Close();
        }

        pdfDocument.Close();

        return caminho;
    }
}
