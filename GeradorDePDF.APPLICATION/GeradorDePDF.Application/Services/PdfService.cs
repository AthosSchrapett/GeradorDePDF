﻿using GeradorDePDF.Domain.Exceptions;
using GeradorDePDF.Domain.Models;
using GeradorDePDF.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using GeradorDePDF.Application.Helpers;

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
}