using GeradorDePDF.Domain.Exceptions;
using GeradorDePDF.Domain.Models;
using GeradorDePDF.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using GeradorDePDF.Application.Helpers;
using GeradorDePDF.Domain.Models.Requests;
using GeradorDePDF.Application.Util;

namespace GeradorDePDF.Application.Services;

public class PdfService : IPdfService
{
    public MemoryStream GeraPdf(List<IFormFile> files)
    {
        if (Path.GetExtension(files[0].FileName) != ".txt")
            throw new FormatoArquivoIncorretoException();

        if(!FormatValidator.ImagemExtension(files[1].FileName))
            throw new FormatoArquivoIncorretoException();

        List<string>? lines = new();

        using StreamReader? reader = new(files[0].OpenReadStream());

        string? line;

        while ((line = reader.ReadLine()) is not null)
            lines.Add(line);

        ModelPdf? model = new()
        {
            Titulo = lines[0],
            Conteudo = lines.Skip(1),
            Imagem = files[1]
        };

        string caminho = ArquivoHelper.CriaPdf(model);

        return ArquivoHelper.GeraArquivoDownload(caminho);
    }

    public MemoryStream GeraPdf(ModelPdf model)
    {
        if (!FormatValidator.ImagemExtension(model.Imagem.FileName))
            throw new FormatoArquivoIncorretoException();

        string caminho = ArquivoHelper.CriaPdf(model);

        return ArquivoHelper.GeraArquivoDownload(caminho);
    }

    public MemoryStream JoinPdf(IEnumerable<IFormFile> files, Dictionary<int, IEnumerable<int>> paginasPdf)
    {
        if (files.Any(x => Path.GetExtension(x.FileName) != ".pdf"))
            throw new FormatoArquivoIncorretoException();

        string caminho = PdfManipulatorHelper.JuntarPdf(files, paginasPdf);

        return ArquivoHelper.GeraArquivoDownload(caminho);
    }

    public MemoryStream SplitPdf(PdfRequestModel model)
    {
        if (Path.GetExtension(model?.File?.FileName) != ".pdf")
            throw new FormatoArquivoIncorretoException();

        List<string> caminhos = PdfManipulatorHelper.SepararPdf(model);

        return ArquivoHelper.GeraArquivoZip(caminhos);
    }
}
