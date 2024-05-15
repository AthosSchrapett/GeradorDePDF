using GeradorDePDF.API.Extensions;
using GeradorDePDF.Application.Hubs;
using GeradorDePDF.Infra.IoC.Extensions;
using GeradorDePDF.Infra.IoC.Middelwares;
using Microsoft.AspNetCore.Http.Connections;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRouting(map => map.LowercaseUrls = true);
builder.Services.AddControllers()
        .AddJsonOptions(opt => { opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); });
;
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors();

builder.Services.AddSwaggerDoc();
builder.Services.AddServices();
builder.Services.AddSignalR();

var app = builder.Build();

app.UseSwaggerDoc();

app.UseHttpsRedirection();

app.UseCors(c =>
{
    c.AllowAnyHeader();
    c.AllowAnyMethod();
    c.AllowAnyOrigin();
});

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.UseMiddleware<HandleException>();
app.MapHub<ProgressHub>("/progressHub", x =>
{
    x.Transports = HttpTransportType.WebSockets;
});

app.Run();
