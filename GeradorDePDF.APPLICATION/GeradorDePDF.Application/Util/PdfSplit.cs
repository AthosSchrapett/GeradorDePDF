using iText.Kernel.Pdf;
using iText.Kernel.Utils;

namespace GeradorDePDF.Application.Util;

public class PdfSplit : PdfSplitter
{
    public string Caminho { get; private set; }

    public PdfSplit(PdfDocument pdfDocument, string caminho) : base(pdfDocument)
    {
        Caminho = caminho;
    }

    protected override PdfWriter GetNextPdfWriter(PageRange documentPageRange)
    {
        return new PdfWriter(Caminho);
    }
}
