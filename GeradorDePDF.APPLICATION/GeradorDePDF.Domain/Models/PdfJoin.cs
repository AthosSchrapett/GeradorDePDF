using Microsoft.AspNetCore.Http;

namespace GeradorDePDF.Domain.Models;
public class PdfJoin(IFormFile pdf, string paginas)
{
    public IFormFile? Pdf { get; private set; } = pdf;
    public int[] Paginas { get; set; } = paginas.Split(',').Select(x => int.Parse(x)).ToArray();
}
