using GeradorDePDF.Domain.Exceptions;

namespace GeradorDePDF.Application.Util;

public class FormatValidator
{
    private static List<string> _formatosImagem = new(3)
    {
       ".jpg",
       ".jpeg",
       ".png"
    };

    public static bool ImagemExtension(string extension)
    {
        if (_formatosImagem.Contains(Path.GetExtension(extension)))
            return true;
        return false;
    }
}
