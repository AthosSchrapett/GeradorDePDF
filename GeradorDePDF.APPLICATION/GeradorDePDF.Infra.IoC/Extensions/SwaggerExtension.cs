﻿using GeradorDePDF.Infra.IoC.Util;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System.Reflection;

namespace GeradorDePDF.Infra.IoC.Extensions;

public static class SwaggerExtensionTeste
{
    public static void AddSwaggerDocTest(this IServiceCollection services)
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
                    Email = "athosschrapett@outlook.com"
                }
            });
            options.OperationFilter<SwaggerFileOperationFilter>();

            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            options.IncludeXmlComments(xmlPath);
        });
    }

    public static void UseSwaggerDocTeste(this IApplicationBuilder app)
    {
        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "GeradorDePDF.API");
        });
    }
}
