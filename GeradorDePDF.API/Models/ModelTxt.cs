namespace GeradorDePDF.API.Models;

public class ModelTxt
{
    public string? Title { get; set; }
    public IEnumerable<string>? Conteudo { get; set; }

    public ModelTxt(string? title, IEnumerable<string>? conteudo)
    {
        Title = title;
        Conteudo = conteudo;
    }
}
