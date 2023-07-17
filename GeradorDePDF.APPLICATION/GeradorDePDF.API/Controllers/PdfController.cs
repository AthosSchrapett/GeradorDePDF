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
        public IActionResult PostTxt([FromForm] List<IFormFile> files) 
            => File(_pdfService.GeraPdf(files[0]), "application/pdf", "temporary.pdf");

        [HttpPost("split-pdf")]
        public IActionResult PostPdfSplit([FromForm] PdfSplitRequestModel model)
            => File(_pdfService.SplitPdf(model.Files[0], model.Ranges), "application/zip", "arquivo.zip");

        [HttpPost("formulario")]
        public IActionResult PostFormulario([FromBody] ModelPdf model) 
            => File(_pdfService.GeraPdf(model), "application/pdf", "temporary.pdf");
    }
}
