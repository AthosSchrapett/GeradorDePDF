using GeradorDePDF.Domain.Exceptions;
using GeradorDePDF.Domain.Models;
using GeradorDePDF.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using GeradorDePDF.Application.Helpers;
using GeradorDePDF.Domain.Models.Requests;

namespace GeradorDePDF.Application.Services;

public class PdfService : IPdfService
{
    public MemoryStream GeraPdf(IFormFile file)
    {
        if (Path.GetExtension(file.FileName) != ".txt")
            throw new FormatoArquivoIncorretoException();

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

    public MemoryStream JoinPdf(List<PdfRequestModel> models)
    {
        if (models.Any(x => Path.GetExtension(x.File.FileName) != ".pdf"))
            throw new FormatoArquivoIncorretoException();

        string caminho = PdfManipulatorHelper.JuntarPdf(models);

        return ArquivoHelper.GeraArquivoDownload(caminho);
    }

    public MemoryStream SplitPdf(PdfRequestModel model)
    {
        if (Path.GetExtension(model.File.FileName) != ".pdf")
            throw new FormatoArquivoIncorretoException();

        List<string>? caminhos = new();

        int contador = 1;

        foreach (string range in model.Ranges)
        {

            string caminhoNovo = Path.Combine(Path.GetTempPath(), $"arquivo_{contador++}.pdf");
            PdfManipulatorHelper.SeparaPdf(model.File, range, ref caminhoNovo);
            caminhos.Add(caminhoNovo);
        }

        return ArquivoHelper.GeraArquivoZip(caminhos);
    }
}
