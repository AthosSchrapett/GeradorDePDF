using GeradorDePDF.API.Models;

namespace GeradorDePDF.API.Services.Interfaces;

public interface IPdfService
{
    public MemoryStream GeraPdf(IFormFile file);
    public MemoryStream GeraPdf(ModelPdf model);
}
