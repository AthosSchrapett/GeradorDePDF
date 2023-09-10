using GeradorDePDF.Domain.Enums;
using GeradorDePDF.Infra.IoC.Util;
using Microsoft.OpenApi.Models;
using System.Reflection;

namespace GeradorDePDF.API.Extensions;

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
                Description = "Projeto desenvolvido por Athos Schrapett",
                Version = "v1",
                Contact = new OpenApiContact
                {
                    Name = "Gerador de PDF",
                    Email = "athosschrapett@outlook.com",
                    Url = new Uri("https://www.linkedin.com/in/athos-louzeiro-schrapett/")
                }
            });
            options.OperationFilter<SwaggerFileOperationFilter>();

            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            options.IncludeXmlComments(xmlPath);
        });
    }

    public static void UseSwaggerDoc(this IApplicationBuilder app)
    {
        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            options.RoutePrefix = "swagger";
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "GeradorDePDF.API");
        });
    }
}
