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

    public static string JuntarPdf(IEnumerable<IFormFile> files, Dictionary<int, List<string>> ranges)
    {

        int contador = 1;
        string caminho = Path.Combine(Path.GetTempPath(), $"_temporary.pdf");

        PdfWriter pdfWriter = new(caminho);
        PdfDocument pdfDocument = new(pdfWriter);
        PdfMerger merger = new(pdfDocument);

        List<PdfDocument> pdfDocuments = new List<PdfDocument>();

        foreach (IFormFile file in files)
        {
            //ranges.TryGetValue(contador, out List<string>? rangesInserir);
            //foreach (string range in rangesInserir)
            //{

            //}

            pdfDocuments.Add(new PdfDocument(new PdfReader(file.OpenReadStream())));

            contador++;
        }

        foreach (PdfDocument pdf in pdfDocuments)
        {
            merger.Merge(pdf, 1, pdf.GetNumberOfPages());

            pdf.Close();
        }

        return caminho;
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

        string caminho = Path.Combine(Path.GetTempPath(), $"_temporary.pdf");

        //PdfWriter pdfWriter = new(caminho);
        //PdfDocument pdfDocument = new(pdfWriter);
        //PdfMerger merger = new(pdfDocument);

        //foreach (var pdf in listaPdf)
        //{
        //    merger.Merge(pdf, 1, pdf.GetNumberOfPages());

        //    pdf.Close();
        //}

        //pdfDocument.Close();

        return caminho;
    }
}
