using GeradorDePDF.Domain.Models;
using GeradorDePDF.Domain.Models.Requests;
using GeradorDePDF.Domain.Services.Interfaces;
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
        public IActionResult PostTxt([FromForm] IFormFile file) 
            => File(_pdfService.GeraPdf(file), "application/pdf", "temporary.pdf");

        [HttpPost("split-pdf")]
        public IActionResult PostPdfSplit([FromForm] PdfRequestModel model)
            => File(_pdfService.SplitPdf(model), "application/zip", "arquivo.zip");

        [HttpPost("join-pdf")]
        public IActionResult PostPdfJoin([FromForm] IEnumerable<IFormFile> files, [FromQuery] Dictionary<int, IEnumerable<int>> paginasPdf)
            => File(_pdfService.JoinPdf(files, paginasPdf), "application/zip", "temporary.pdf");

        [HttpPost("formulario")]
        public IActionResult PostFormulario([FromBody] ModelPdf model) 
            => File(_pdfService.GeraPdf(model), "application/pdf", "temporary.pdf");

    }
}
