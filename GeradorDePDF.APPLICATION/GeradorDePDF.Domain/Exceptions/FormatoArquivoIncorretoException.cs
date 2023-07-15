namespace GeradorDePDF.Domain.Exceptions
{
    public class FormatoArquivoIncorretoException : Exception
    {
        public override string Message => "Formato do arquivo incorreto";
    }
}
