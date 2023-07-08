namespace GeradorDePDF.API.Services.Interfaces;

public interface IPdfService
{
    public MemoryStream GeraPdf(IFormFile file);
}
