using GeradorDePDF.API.Services.Implementations;
using GeradorDePDF.API.Services.Interfaces;

namespace GeradorDePDF.API.Extensions;

public static class ServicesExtension
{
    public static void AddServices(this IServiceCollection services)
    {
        services.AddSingleton<IPdfService, PdfService>();
        services.AddSingleton<IDownloadService, DownloadService>();
    }
}
