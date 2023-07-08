using GeradorDePDF.API.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerDoc();
builder.Services.AddServices();

var app = builder.Build();

app.UseSwaggerDoc();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
