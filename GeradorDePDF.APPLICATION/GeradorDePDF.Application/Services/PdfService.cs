using GeradorDePDF.Domain.Exceptions;
using GeradorDePDF.Domain.Models;
using GeradorDePDF.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using GeradorDePDF.Application.Helpers;
using GeradorDePDF.Domain.Models.Requests;
using System.Text;
using GeradorDePDF.Domain.Enums;
using GeradorDePDF.Domain.Interfaces;

namespace GeradorDePDF.Application.Services;

public class PdfService : IPdfService
{

    private readonly ISignalRService _signalRService;

    public PdfService(ISignalRService signalRService)
    {
        _signalRService = signalRService;
    }

    public async Task<byte[]> GeraPdf(IFormFile file)
    {
        if (Path.GetExtension(file.FileName) != ".txt")
            throw new FormatoArquivoIncorretoException();

        List<string>? lines = ArquivoHelper.RetornaLinhasArquivo(file, Encoding.UTF8);

        ModelPdf ? model = new(lines[0], lines.Skip(1));

        string caminho = ArquivoHelper.CriaPdf(model);

        await _signalRService.StartProgress();

        return ArquivoHelper.GeraArquivoDownload(caminho);
    }

    public async Task<byte[]> GeraPdf(ModelPdf model)
    {
        string caminho = ArquivoHelper.CriaPdf(model);

        await _signalRService.StartProgress();

        return ArquivoHelper.GeraArquivoDownload(caminho);
    }

    public async Task<byte[]> GeraPdfWithCsv(CsvPdfRequestModel model)
    {
        if(Path.GetExtension(model.File.FileName) != ".csv")
            throw new FormatoArquivoIncorretoException();

        Encoding encoding = GetEncoding(model.EncodingType);

        List<string>? lines = ArquivoHelper.RetornaLinhasArquivo(model.File, encoding);
        string caminho = CsvHelper.CriarTabela(lines, model.Delimitador, model.PageOrientationType, model.Titulo);

        await _signalRService.StartProgress();

        return ArquivoHelper.GeraArquivoDownload(caminho);
    }

    private static Encoding GetEncoding(EncodingType encodingType)
    {
        return encodingType switch
        {
            EncodingType.UTF8 => Encoding.UTF8,
            EncodingType.ASCII => Encoding.ASCII,
            EncodingType.ISO88591 => Encoding.Latin1,
            _ => throw new NotSupportedException("Encoding não suportado."),
        };
    }

    public async Task<byte[]> JoinPdf(IEnumerable<IFormFile> files, List<string> paginasPdf)
    {
        if (files.Any(x => Path.GetExtension(x.FileName) != ".pdf"))
            throw new FormatoArquivoIncorretoException();

        List<PdfJoin> pdfs = files
            .Zip(paginasPdf, (arquivo, paginas) => new PdfJoin(arquivo, paginas))
            .ToList();

        string caminho = PdfManipulatorHelper.JuntarPdf(pdfs);

        await _signalRService.StartProgress();

        return ArquivoHelper.GeraArquivoDownload(caminho);
    }

    public async Task<byte[]> SplitPdf(PdfRequestModel model)
    {
        if (Path.GetExtension(model?.File?.FileName) != ".pdf")
            throw new FormatoArquivoIncorretoException();

        List<string> caminhos = PdfManipulatorHelper.SepararPdf(model);

        byte[] arquivoZip = ArquivoHelper.GeraArquivoZip(caminhos);

        await _signalRService.StartProgress();

        return arquivoZip;
    }
}
