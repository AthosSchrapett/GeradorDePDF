using GeradorDePDF.Domain.Services.Interfaces;
using GeradorDePDF.Application.Helpers;

namespace GeradorDePDF.Application.Services;

public class DownloadService : IDownloadService
{
    public MemoryStream DownloadModeloTxt()
    {
        string pathArquivoModelo = Path.Combine(Environment.CurrentDirectory, "Arquivos", "Modelo.txt");

        return ArquivoHelper.GeraArquivoDownload(pathArquivoModelo);
    }
}
