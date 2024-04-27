using GeradorDePDF.Domain.Services.Interfaces;
using GeradorDePDF.Application.Helpers;

namespace GeradorDePDF.Application.Services;

public class DownloadService : IDownloadService
{
    public byte[] DownloadModeloTxt()
    {
        string pathArquivoModelo = Path.Combine(Environment.CurrentDirectory, "Arquivos", "Modelo.txt");

        return ArquivoHelper.GeraArquivoDownload(pathArquivoModelo);
    }
}
