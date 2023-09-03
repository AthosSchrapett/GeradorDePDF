using GeradorDePDF.API.Extensions;
using GeradorDePDF.Infra.IoC.Extensions;
using GeradorDePDF.Infra.IoC.Middelwares;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRouting(map => map.LowercaseUrls = true);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors();

builder.Services.AddSwaggerDoc();
builder.Services.AddServices();

var app = builder.Build();

app.UseSwaggerDoc();

app.UseHttpsRedirection();

app.UseCors(c =>
{
    c.AllowAnyHeader();
    c.AllowAnyMethod();
    c.AllowAnyOrigin();
});

app.UseAuthorization();

app.MapControllers();

app.UseMiddleware<HandleException>();

app.Run();
