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

        ModelPdf? model = new(lines[0], lines.Skip(1));

        string caminho = ArquivoHelper.CriaPdf(model);

        return ArquivoHelper.GeraArquivoDownload(caminho);
    }

    public MemoryStream GeraPdf(ModelPdf model)
    {
        string caminho = ArquivoHelper.CriaPdf(model);

        return ArquivoHelper.GeraArquivoDownload(caminho);
    }
}
