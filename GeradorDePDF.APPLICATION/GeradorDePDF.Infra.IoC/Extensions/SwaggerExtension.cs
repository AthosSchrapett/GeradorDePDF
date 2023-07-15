using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace GeradorDePDF.Infra.IoC.Extensions;

public static class SwaggerExtension
{
    public static void AddSwaggerDoc(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Gerador de PDF",
                Description = "API para gerar PDF.",
                Version = "v1",
                Contact = new OpenApiContact
                {
                    Name = "Gerador de PDF",
                }
            });
        });
    }

    public static void UseSwaggerDoc(this IApplicationBuilder app)
    {
        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "GeradorDePDF.API");
        });
    }
}
