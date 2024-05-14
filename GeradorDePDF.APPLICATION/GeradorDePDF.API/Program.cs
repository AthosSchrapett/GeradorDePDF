using GeradorDePDF.API.Extensions;
using GeradorDePDF.Application.Hubs;
using GeradorDePDF.Infra.IoC.Extensions;
using GeradorDePDF.Infra.IoC.Middelwares;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRouting(map => map.LowercaseUrls = true);
builder.Services.AddControllers()
        .AddJsonOptions(opt => { opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); });
;
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDevServer", builder => 
        builder
            .WithOrigins(
                "http://localhost:4200", 
                "https://geradordepdf-web.onrender.com/"
             )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
});

builder.Services.AddSwaggerDoc();
builder.Services.AddServices();
builder.Services.AddSignalR();

var app = builder.Build();

app.UseSwaggerDoc();

app.UseHttpsRedirection();

app.UseCors("AllowAngularDevServer");

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.UseMiddleware<HandleException>();
app.MapHub<ProgressHub>("/progressHub");

app.Run();
