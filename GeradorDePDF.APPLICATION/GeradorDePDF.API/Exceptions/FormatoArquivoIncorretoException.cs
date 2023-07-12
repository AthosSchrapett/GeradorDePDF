namespace GeradorDePDF.API.Exceptions
{
    public class FormatoArquivoIncorretoException : Exception
    {
        public override string Message => "Formato do arquivo incorreto";
    }
}
