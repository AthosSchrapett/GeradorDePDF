using System.ComponentModel;

namespace GeradorDePDF.Domain.Enums
{
    public enum EncodingType
    {
        [Description("UTF-8")]
        UTF8,
        [Description("ISO-8859-1")]
        ISO88591,
        [Description("ASCII")]
        ASCII
    }
}
