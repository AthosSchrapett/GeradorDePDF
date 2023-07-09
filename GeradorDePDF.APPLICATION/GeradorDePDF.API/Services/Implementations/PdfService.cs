using GeradorDePDF.API.Models;
using GeradorDePDF.API.Services.Helpers;
using GeradorDePDF.API.Services.Interfaces;

namespace GeradorDePDF.API.Services.Implementations;

public class PdfService : IPdfService
{
    public MemoryStream GeraPdf(IFormFile file)
    {
        List<string>? lines = new();

        using StreamReader? reader = new(file.OpenReadStream());

        string? line;

        while ((line = reader.ReadLine()) is not null)
            lines.Add(line);

        ModelTxt? modelTxt = new(lines[0], lines.Skip(1));

        string caminho = ArquivoHelper.CriaPdf(modelTxt);

        ArquivoHelper.GeraArquivoDownload(caminho, out MemoryStream memoryStream);

        return memoryStream;
    }    
}
