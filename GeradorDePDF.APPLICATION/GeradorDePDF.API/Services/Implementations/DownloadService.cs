using GeradorDePDF.API.Services.Helpers;
using GeradorDePDF.API.Services.Interfaces;
using System.Reflection;

namespace GeradorDePDF.API.Services.Implementations;

public class DownloadService : IDownloadService
{
    public MemoryStream DownloadModeloTxt()
    {
        string pathArquivoModelo = Path.Combine(Environment.CurrentDirectory, "Arquivos", "Modelo.txt");

        return ArquivoHelper.GeraArquivoDownload(pathArquivoModelo);
    }
}
