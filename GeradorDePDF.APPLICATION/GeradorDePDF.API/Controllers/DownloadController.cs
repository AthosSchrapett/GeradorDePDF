using GeradorDePDF.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GeradorDePDF.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DownloadController : ControllerBase
    {
        //private readonly IDownloadService _downloadService;

        //public DownloadController(IDownloadService downloadService)
        //{
        //    _downloadService = downloadService;
        //}

        //[HttpGet]
        //public IActionResult Get()
        //    => File(_downloadService.DownloadModeloTxt(), "application/txt", "modelo.txt");
    }
}
