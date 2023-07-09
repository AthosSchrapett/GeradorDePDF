using GeradorDePDF.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GeradorDePDF.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PdfController : ControllerBase
    {
        private readonly IPdfService _pdfService;

        public PdfController(IPdfService pdfService) => _pdfService = pdfService;

        [HttpPost]
        public IActionResult Post([FromForm] List<IFormFile> files)
        {
            if (Path.GetExtension(files[0].FileName) != ".txt")
                return StatusCode(StatusCodes.Status406NotAcceptable, "Formato do arquivo incorreto");

            MemoryStream file = _pdfService.GeraPdf(files[0]);

            return File(file, "application/pdf", "temporary.pdf");
        }
    }
}
