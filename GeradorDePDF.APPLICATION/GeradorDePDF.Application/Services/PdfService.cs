using GeradorDePDF.Domain.Exceptions;
using GeradorDePDF.Domain.Models;
using GeradorDePDF.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using GeradorDePDF.Application.Helpers;
using GeradorDePDF.Domain.Models.Requests;
using System.Text;
using GeradorDePDF.Domain.Enums;

namespace GeradorDePDF.Application.Services;

public class PdfService : IPdfService
{
    public byte[] GeraPdf(IFormFile file)
    {
        if (Path.GetExtension(file.FileName) != ".txt")
            throw new FormatoArquivoIncorretoException();

        List<string>? lines = ArquivoHelper.RetornaLinhasArquivo(file, Encoding.UTF8);

        ModelPdf ? model = new(lines[0], lines.Skip(1));

        string caminho = ArquivoHelper.CriaPdf(model);

        return ArquivoHelper.GeraArquivoDownload(caminho);
    }

    public byte[] GeraPdf(ModelPdf model)
    {
        string caminho = ArquivoHelper.CriaPdf(model);

        return ArquivoHelper.GeraArquivoDownload(caminho);
    }

    public byte[] GeraPdfWithCsv(CsvPdfRequestModel model)
    {
        if(Path.GetExtension(model.File.FileName) != ".csv")
            throw new FormatoArquivoIncorretoException();

        Encoding encoding = GetEncoding(model.EncodingType);

        List<string>? lines = ArquivoHelper.RetornaLinhasArquivo(model.File, encoding);
        string caminho = CsvHelper.CriarTabela(lines, model.Delimitador, model.PageOrientationType, model.Titulo);

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

    public byte[] JoinPdf(IEnumerable<IFormFile> files, List<string> paginasPdf)
    {
        if (files.Any(x => Path.GetExtension(x.FileName) != ".pdf"))
            throw new FormatoArquivoIncorretoException();

        List<PdfJoin> pdfs = files
            .Zip(paginasPdf, (arquivo, paginas) => new PdfJoin(arquivo, paginas))
            .ToList();

        string caminho = PdfManipulatorHelper.JuntarPdf(pdfs);

        return ArquivoHelper.GeraArquivoDownload(caminho);
    }

    public byte[] SplitPdf(PdfRequestModel model)
    {
        if (Path.GetExtension(model?.File?.FileName) != ".pdf")
            throw new FormatoArquivoIncorretoException();

        List<string> caminhos = PdfManipulatorHelper.SepararPdf(model);

        return ArquivoHelper.GeraArquivoZip(caminhos);
    }
}
