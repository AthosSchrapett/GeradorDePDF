using GeradorDePDF.Application.Services;
using GeradorDePDF.Domain.Interfaces;
using GeradorDePDF.Domain.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace GeradorDePDF.Infra.IoC.Extensions;

public static class ServicesExtension
{
    public static void AddServices(this IServiceCollection services)
    {
        services.AddScoped<IPdfService, PdfService>();
        services.AddScoped<IDownloadService, DownloadService>();
        services.AddScoped<ISignalRService, SignalRService>();
    }
}
