using GeradorDePDF.API.Exceptions;
using GeradorDePDF.API.Models;
using System.Net;

namespace GeradorDePDF.API.Middelwares
{
    public class HandleException
    {
        private readonly RequestDelegate? _next;

        public HandleException(RequestDelegate? next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception e)
            {
                await HandleExceptionAsync(context, e);
            }
        }

        private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.StatusCode = exception switch
            {
                FormatoArquivoIncorretoException => (int)HttpStatusCode.NotAcceptable,
                _ => (int)HttpStatusCode.BadRequest
            };

            context.Response.ContentType = "application/json";

            ErrorResponse errorResponse = new(context.Response.StatusCode, exception.Message);
            await context.Response.WriteAsync(errorResponse.ToString());
        }
    }
}
