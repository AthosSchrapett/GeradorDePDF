using GeradorDePDF.Domain.Models;
using Microsoft.AspNetCore.Http;

namespace GeradorDePDF.Domain.Services.Interfaces;

public interface IPdfService
{
    public MemoryStream GeraPdf(IFormFile file);
    public MemoryStream GeraPdf(ModelPdf model);
}
