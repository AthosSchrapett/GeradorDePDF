using iText.Kernel.Colors;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;

namespace GeradorDePDF.Application.Helpers;

public class CsvHelper
{
    public static string CriarTabela(List<string> linhas)
    {
        List<string> colunas = linhas.First().Split(';').ToList();
        List<string[]> linhasTabela = linhas.Skip(1).Select(x => x.Split(';')).ToList();

        string caminho = CriarPdfPorCsv(colunas, linhasTabela);

        return caminho;
    }

    private static string CriarPdfPorCsv(List<string> colunas, List<string[]> linhasTabela)
    {
        string caminho = Path.Combine(Path.GetTempPath(), "temporary.pdf");

        PdfDocument pdf = new(new PdfWriter(caminho));
        Document document = new(pdf);

        Table table = new(colunas.Count, true);

        foreach (string coluna in colunas)
        {
            Cell cell = new Cell().Add(new Paragraph(coluna));
            cell.SetBackgroundColor(DeviceGray.GRAY);

            cell.SetFontSize(12)
                .SetFontColor(DeviceGray.BLACK);

            cell.SetTextAlignment(TextAlignment.CENTER);
            cell.SetVerticalAlignment(VerticalAlignment.MIDDLE);            

            table.AddCell(cell);
        }

        foreach (string[] linhas in linhasTabela)
        {
            foreach (var linha in linhas)
            {
                Cell cell = new Cell().Add(new Paragraph(linha));
                cell.SetTextAlignment(TextAlignment.CENTER);
                cell.SetVerticalAlignment(VerticalAlignment.MIDDLE);

                table.AddCell(cell);
            }
        }

        Cell cellFinal = new Cell().SetHeight(-1).SetBorderBottom(new SolidBorder(1));
        for (int i = 0; i < colunas.Count; i++)
        {
            table.AddCell(cellFinal);
        }

        document.Add(table);
        document.Close();

        return caminho;
    }
}
