﻿using GeradorDePDF.Domain.Models;
using iText.Kernel.Colors;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Draw;
using iText.Layout;
using iText.Layout.Element;
using Microsoft.AspNetCore.Http;
using System.IO.Compression;
using System.Text;

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
               .SetRelativePosition(0, 2, 0, 30)
               .SetFontColor(principalColor)
               .SetFontSize(25);

        SolidLine sl = new();

        LineSeparator ls = new(sl);
        ls.SetRelativePosition(0, 5, 0, 35);

        document.Add(header);
        document.Add(ls);

        CriaParagrafo(document, model);

        document.Close();

        return caminho;
    }

    public static List<string>? RetornaLinhasArquivo(IFormFile file, Encoding encoding)
    {
        List<string>? lines = new();

        using StreamReader? reader = new(file.OpenReadStream(), encoding);

        string? line;

        while ((line = reader.ReadLine()) is not null)
            lines.Add(line);

        return lines;
    }

    public static byte[] GeraArquivoDownload(string caminho)
    {
        FileStream origemStream = File.Open(caminho, FileMode.Open);
        MemoryStream memoryStream = new();
        origemStream.CopyTo(memoryStream);

        memoryStream.Seek(0, SeekOrigin.Begin);

        origemStream.Close();

        return memoryStream.ToArray();
    }

    public static byte[] GeraArquivoZip(List<string> caminhosPdf)
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

        return memoryStream.ToArray();
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
