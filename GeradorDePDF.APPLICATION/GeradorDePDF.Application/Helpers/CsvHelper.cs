using GeradorDePDF.Domain.Enums;
using iText.Kernel.Colors;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;

namespace GeradorDePDF.Application.Helpers;

public class CsvHelper
{
    public static string CriarTabela(List<string> linhas, string delimitador, PageOrientationType pageOrientationType, string titulo)
    {
        List<string> colunas = linhas.First().Split(delimitador).ToList();
        List<string[]> linhasTabela = linhas.Skip(1).Select(x => x.Split(delimitador)).ToList();

        string caminho = CriarPdfPorCsv(colunas, linhasTabela, pageOrientationType, titulo);

        return caminho;
    }

    private static string CriarPdfPorCsv(List<string> colunas, List<string[]> linhasTabela, PageOrientationType pageOrientationType, string titulo)
    {
        string caminho = Path.Combine(Path.GetTempPath(), "temporary.pdf");

        PdfDocument pdf = new(new PdfWriter(caminho));

        if(pageOrientationType is PageOrientationType.Horizontal)
            pdf.SetDefaultPageSize(iText.Kernel.Geom.PageSize.A4.Rotate());
        
        Document document = new(pdf);

        Paragraph title = new(titulo);
        title
            .SetTextAlignment(TextAlignment.CENTER)
            .SetFontSize(18)
            .SetBold();
        document.Add(title);

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

        Cell cellFinal = new Cell().SetHeight(0).SetBorderBottom(new SolidBorder(1));
        for (int i = 0; i < colunas.Count; i++)
        {
            table.AddCell(cellFinal);
        }

        document.Add(table);
        document.Close();

        return caminho;
    }
}
