using Microsoft.AspNetCore.Http;

namespace GeradorDePDF.Domain.Models;

public class ModelPdf
{
    public string? Titulo { get; set; }
    public IFormFile Imagem { get; set; }
    public IEnumerable<string>? Conteudo { get; set; }

    //public ModelPdf(string? titulo, IEnumerable<string>? conteudo)
    //{
    //    Titulo = titulo;
    //    Conteudo = conteudo;
    //}
}
