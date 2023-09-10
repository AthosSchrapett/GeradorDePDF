using GeradorDePDF.Domain.Enums;
using GeradorDePDF.Domain.Models.Requests;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Diagnostics;

namespace GeradorDePDF.Infra.IoC.Util;

public class SwaggerFileOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        var fileUploadMime = "multipart/form-data";

        if (operation.RequestBody == null ||
            !operation.RequestBody.Content.Any(x => x.Key.Equals(
                fileUploadMime, StringComparison.InvariantCultureIgnoreCase)))
            return;

        var fileParams = context.MethodInfo.GetParameters();

        foreach (var fileParam in fileParams)
        {
            if (fileParam.ParameterType == typeof(IFormFile))
            {
                operation.RequestBody.Content[fileUploadMime].Schema.Properties =
                    fileParams.ToDictionary(k => k.Name, v => new OpenApiSchema()
                    {
                        Type = "string",
                        Format = "binary"
                    });
            }
            else if (fileParam.ParameterType == typeof(List<IFormFile>))
            {
                operation.RequestBody.Content[fileUploadMime].Schema.Properties[fileParam.Name] =
                    new OpenApiSchema()
                    {
                        Type = "array",
                        Items = new OpenApiSchema()
                        {
                            Type = "string",
                            Format = "binary"
                        }
                    };
            }
            //else if (fileParam.ParameterType == typeof(CsvPdfRequestModel))
            //{
            //    var names = Enum.GetNames(typeof(EncodingType));
            //    var arr = new OpenApiArray();
            //    arr.AddRange(names.Select(name => new OpenApiString(name)));

            //    var teste = operation.RequestBody.Content[fileUploadMime].Schema.Properties["EncodingType"];
            //}
        }
    }
}
