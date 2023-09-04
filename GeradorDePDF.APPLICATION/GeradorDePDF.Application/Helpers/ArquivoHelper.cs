using GeradorDePDF.Domain.Models;
using iText.IO.Image;
using iText.Kernel.Colors;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Draw;
using iText.Layout;
using iText.Layout.Element;
using System.IO.Compression;

namespace GeradorDePDF.Application.Helpers;

public class ArquivoHelper
{
    public static string CriaPdf(ModelPdf model)
    {
        string caminho = Path.GetTempFileName();

        PdfWriter writer = new(caminho);
        PdfDocument pdf = new(writer);
        Document document = new(pdf);

        DeviceRgb principalColor = new(33, 4, 86);

        document.SetFontColor(principalColor);

        Paragraph header = new Paragraph(model.Titulo)
               .SetRelativePosition(0, 35, 0, 0)
               .SetFontColor(principalColor)
               .SetFontSize(25);

        using MemoryStream imagemStream = new();
        model.Imagem.CopyTo(imagemStream);

        Image img = new Image(ImageDataFactory
            .Create(imagemStream.ToArray()))
            .SetRelativePosition(370, -30, 0, 5)
            .SetWidth(150);

        SolidLine sl = new();

        LineSeparator ls = new(sl);
        ls.SetRelativePosition(0, 5, 0, 0);

        Paragraph paragraph = new Paragraph("")
                .SetRelativePosition(5, 40, 0, 0)
                .SetFontSize(10);

        document.Add(header);
        document.Add(img);
        document.Add(ls);

        document.Add(paragraph);

        CriaParagrafo(document, model);

        document.Close();

        return caminho;
    }

    public static MemoryStream GeraArquivoDownload(string caminho)
    {
        FileStream origemStream = File.Open(caminho, FileMode.Open);
        MemoryStream memoryStream = new();
        origemStream.CopyTo(memoryStream);

        memoryStream.Seek(0, SeekOrigin.Begin);

        origemStream.Close();

        return memoryStream;
    }

    public static MemoryStream GeraArquivoZip(List<string> caminhosPdf)
    {
        MemoryStream memoryStream = new();

        using (ZipArchive zip = new(memoryStream, ZipArchiveMode.Create, true))
        {
            foreach (string caminho in caminhosPdf)
            {
                string nomeArquivo = Path.GetFileName(caminho);
                ZipArchiveEntry entry = zip.CreateEntry(nomeArquivo);

                using Stream entryStream = entry.Open();
                using FileStream fileStream = File.OpenRead(caminho);
                fileStream.CopyTo(entryStream);
            }
        }

        memoryStream.Seek(0, SeekOrigin.Begin);

        return memoryStream;
    }

    private static void CriaParagrafo(Document document, ModelPdf model)
    {
        foreach (string linha in model.Conteudo)
        {
            Paragraph paragraph = new Paragraph(linha)
                .SetRelativePosition(5, 5, 0, 0)
                .SetFontSize(10);

            document.Add(paragraph);
        }
    }
}
