using GeradorDePDF.API.Models;
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
            => File(_pdfService.GeraPdf(files[0]), "application/pdf", "temporary.pdf");

        [HttpPost("formulario")]
        public IActionResult Post([FromBody] ModelPdf model) 
            => File(_pdfService.GeraPdf(model), "application/pdf", "temporary.pdf");
    }
}
