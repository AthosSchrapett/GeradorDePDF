using GeradorDePDF.API.Models;
using iText.Kernel.Colors;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Draw;
using iText.Layout;
using iText.Layout.Element;

namespace GeradorDePDF.API.Services.Helpers;

public class ArquivoHelper
{
    public static string CriaPdf(ModelTxt modelTxt)
    {
        string caminho = Path.Combine(Environment.CurrentDirectory, "files", "temporary.pdf");
        Console.WriteLine(caminho);

        PdfWriter writer = new(caminho);
        PdfDocument pdf = new(writer);
        Document document = new(pdf);

        DeviceRgb principalColor = new(33, 4, 86);

        document.SetFontColor(principalColor);

        Paragraph header = new Paragraph(modelTxt.Title)
               .SetRelativePosition(0, 2, 0, 30)
               .SetFontColor(principalColor)
               .SetFontSize(25);

        SolidLine sl = new();

        LineSeparator ls = new(sl);
        ls.SetRelativePosition(0, 5, 0, 35);

        document.Add(header);
        document.Add(ls);

        foreach (string linha in modelTxt.Conteudo)
        {
            Paragraph paragraph = new Paragraph(linha)
                .SetRelativePosition(5, 5, 0, 0)
                .SetFontSize(10);

            document.Add(paragraph);
        }

        document.Close();

        return caminho;
    }

    public static void GeraArquivoDownload(string caminho, out MemoryStream memoryStream)
    {
        FileStream origemStream = File.Open(caminho, FileMode.Open);
        memoryStream = new MemoryStream();
        origemStream.CopyTo(memoryStream);

        memoryStream.Seek(0, SeekOrigin.Begin);

        origemStream.Close();
    }
}
