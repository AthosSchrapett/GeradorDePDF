using GeradorDePDF.Application.Util;
using iText.Kernel.Pdf;
using iText.Kernel.Utils;
using Microsoft.AspNetCore.Http;

namespace GeradorDePDF.Application.Helpers;

public class PdfManipulatorHelper
{
    public static PdfDocument SeparaPdf(IFormFile file, string range, string caminho)
    {
        Stream stream = file.OpenReadStream();
        PdfDocument pdf = new(new PdfReader(stream));

        PdfSplit pdfSplit = new(pdf, caminho);
        PdfDocument result = pdfSplit.ExtractPageRange(new PageRange(range));

        return result;
    }

    public static string JuntarPdf(IEnumerable<IFormFile> files, Dictionary<int, List<string>> ranges)
    {
        List<PdfDocument> pdfDocuments = new();

        int contador = 1;
        foreach (var file in files)
        {
            List<string> listaDeRanges = ranges[contador];

            int contadorCaminhoRange = contador;

            foreach (string range in listaDeRanges)
            {
                string caminho = Path.Combine(Path.GetTempPath(), $"arquivo_{contador}_{contadorCaminhoRange++}.pdf");
                PdfDocument pdfSeparado = SeparaPdf(file, range, caminho);
                pdfDocuments.Add(pdfSeparado);
            }

            contador++;
        }

        string caminhoMerge = Path.Combine(Path.GetTempPath(), $"{Guid.NewGuid}_temporary.pdf");

        PdfWriter pdfWriter = new(caminhoMerge);
        PdfDocument pdfDocument = new(pdfWriter);
        PdfMerger merger = new(pdfDocument);

        foreach (PdfDocument pdf in pdfDocuments)
        {
            merger.Merge(pdf, 1, pdf.GetNumberOfPages());

            pdf.Close();
        }

        return caminhoMerge;
    }
}
