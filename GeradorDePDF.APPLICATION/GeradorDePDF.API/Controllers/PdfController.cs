using GeradorDePDF.Domain.Models;
using GeradorDePDF.Domain.Models.Requests;
using GeradorDePDF.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GeradorDePDF.API.Controllers
{
    /// <summary>
    /// Esse controller lida com toda a parte de geração e manipulação de PDF
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class PdfController : ControllerBase
    {
        private readonly IPdfService _pdfService;

        public PdfController(IPdfService pdfService) => _pdfService = pdfService;

        /// <summary>
        /// Geração de PDF a partir de um TXT
        /// </summary>
        /// <remarks>Faça o upload de um arquivo ".txt" e terá como retorno um arquivo ".pdf"</remarks>
        /// <param name="file">Arquivo ".txt"</param>
        /// <returns>PDF</returns>
        /// <response code="200">Retorna um arquivo PDF</response>
        /// <response code="406">Retorna um Erro por conta do tipo de extensão, somente aceito ".txt"</response>
        [HttpPost("txt")]
        public async Task<IActionResult> PostTxt([FromForm] IFormFile file)
            => File(await _pdfService.GeraPdf(file), "application/pdf", "temporary.pdf");

        /// <summary>
        /// Geração de PDF a partir de um objeto.
        /// </summary>
        /// <remarks>Será gerado um arquivo ".pdf", ao se incluir no modelo, um titulo e o seu conteúdo</remarks>
        /// <returns>PDF</returns>
        /// <response code="200">Retorna um arquivo PDF</response>
        [HttpPost("formulario")]
        public async Task<IActionResult> PostFormulario([FromBody] ModelPdf model)
            => File(await _pdfService.GeraPdf(model), "application/pdf", "temporary.pdf");

        /// <summary>
        /// Separação de PDF
        /// </summary>
        /// <remarks>
        ///     Será separado o pdf com base nas paginas escolhidas, 
        ///     como retorno, um arquivo zip com os arquivos de acordo 
        ///     com a definição de páginas. 
        /// </remarks>
        /// <returns>Zip</returns>
        /// <response code="200">Retorna um arquivo Zip com os PDFs separados</response>
        /// <response code="406">Retorna um Erro por conta do tipo de extensão, somente aceito ".pdf"</response>
        [HttpPost("split-pdf")]
        public async Task<IActionResult> PostPdfSplit([FromForm] Domain.Models.Requests.PdfRequestModel model)
            => File(await _pdfService.SplitPdf(model), "application/zip", "arquivo.zip");

        /// <summary>
        /// Junção de um ou mais PDFs
        /// </summary>
        /// <remarks>
        ///     Será feito o upload de vários arquivos ".pdf".
        ///     
        ///     Deverão também serem definidas as paginas que serão incluídas no novo pdf.
        ///</remarks>
        /// <returns>PDF</returns>
        /// <response code="200">Retorna um arquivo PDF unificado</response>
        /// <response code="406">Retorna um Erro por conta do tipo de extensão, somente aceito ".pdf"</response>
        [HttpPost("join-pdf")]
        public async Task<IActionResult> PostPdfJoin([FromForm] IEnumerable<IFormFile> files, [FromForm] List<string> paginas)
            => File(await _pdfService.JoinPdf(files, paginas), "application/pdf", "temporary.pdf");

        /// <summary>
        /// Criação de PDF a partir de um ".csv"
        /// </summary>
        /// <remarks>
        /// Será feito o upload de um arquivo ".csv" e como retorno um arquivo ".pdf"
        ///</remarks>
        /// <returns>PDF</returns>
        /// <response code="200">Retorna um arquivo PDF</response>
        /// <response code="406">Retorna um Erro por conta do tipo de extensão, somente aceito ".csv"</response>
        [HttpPost("csv-pdf")]
        public async Task<IActionResult> PostCsv([FromForm] CsvPdfRequestModel model) => 
            File(await _pdfService.GeraPdfWithCsv(model), "application/pdf", "temporary.pdf");

    }
}
