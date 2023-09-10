using PdfSharpCore;
using PdfSharpCore.Drawing;
using PdfSharpCore.Pdf;

namespace GeradorDePDF.Application.Helpers
{
    public class PdfHelper
    {
        public static string PdfCreate()
        {

            string caminho = Path.Combine(Path.GetTempPath(), "documento.pdf");

            // Crie um novo documento PDF
            PdfDocument document = new PdfDocument();

            // Crie uma nova página
            PdfPage page = document.AddPage();
            page.Size = PageSize.A4;

            // Obtenha um objeto XGraphics para desenhar na página
            XGraphics gfx = XGraphics.FromPdfPage(page);

            // Texto de exemplo (texto grande)
            string textoLongo = @"One Piece

                ""One Piece"" é uma série de mangá e anime criada por Eiichiro Oda. Ela conta a história de Monkey D. Luffy, um jovem pirata que está em busca do tesouro lendário conhecido como ""One Piece"". A história se passa em um mundo fictício, onde piratas e a Marinha estão em constante conflito.

                Luffy é o capitão dos Chapéus de Palha, uma tripulação de piratas formada por pessoas com habilidades únicas. Seu objetivo é se tornar o Rei dos Piratas, alcançando o tesouro do One Piece, que está escondido na Grand Line, uma perigosa rota marítima cheia de ilhas misteriosas e desafios.

                Ao longo da jornada, Luffy e sua tripulação enfrentam diversos inimigos poderosos, incluindo outros piratas e marinheiros de alta patente. Eles também encontram aliados leais e formam alianças estratégicas para superar obstáculos.

                O enredo abrange uma ampla variedade de temas, como amizade, coragem, sacrifício, justiça e liberdade. Além disso, cada personagem da tripulação dos Chapéus de Palha tem suas próprias histórias de fundo e motivações individuais.

                Durante a aventura, Luffy ganha poderes especiais ao comer uma fruta do diabo chamada ""Gomu Gomu no Mi"", que o transforma em um ""homem de borracha"". Isso permite que ele estique seu corpo e tenha habilidades físicas sobre-humanas. No entanto, ele se torna incapaz de nadar, já que as frutas do diabo têm o efeito colateral de anular a habilidade de nadar dos seus consumidores.

                A série explora a complexa política mundial do mundo de One Piece, com o Governo Mundial e a Marinha sendo as principais forças que tentam manter a ordem e caçar os piratas. Também há a presença de Yonkous, os quatro piratas mais poderosos do mundo, e Shichibukais, piratas aliados do Governo Mundial.

                Ao longo da história, são revelados segredos importantes, como a história dos antigos séculos, a existência dos Poneglyphs, escritos ancestrais que contêm informações cruciais, e a verdade por trás da Void Century, um período misterioso da história que foi ocultado pelo Governo Mundial.

                ""One Piece"" é conhecido por sua narrativa rica e cativante, personagens memoráveis, lutas épicas, reviravoltas surpreendentes e um mundo vasto e detalhado. A série tem uma enorme base de fãs em todo o mundo e se tornou uma das franquias de mídia mais populares e bem-sucedidas da história.

                ""One Piece"" é uma série de mangá e anime criada por Eiichiro Oda. Ela conta a história de Monkey D. Luffy, um jovem pirata que está em busca do tesouro lendário conhecido como ""One Piece"". A história se passa em um mundo fictício, onde piratas e a Marinha estão em constante conflito.

                Luffy é o capitão dos Chapéus de Palha, uma tripulação de piratas formada por pessoas com habilidades únicas. Seu objetivo é se tornar o Rei dos Piratas, alcançando o tesouro do One Piece, que está escondido na Grand Line, uma perigosa rota marítima cheia de ilhas misteriosas e desafios.

                Ao longo da jornada, Luffy e sua tripulação enfrentam diversos inimigos poderosos, incluindo outros piratas e marinheiros de alta patente. Eles também encontram aliados leais e formam alianças estratégicas para superar obstáculos.

                O enredo abrange uma ampla variedade de temas, como amizade, coragem, sacrifício, justiça e liberdade. Além disso, cada personagem da tripulação dos Chapéus de Palha tem suas próprias histórias de fundo e motivações individuais.

                Durante a aventura, Luffy ganha poderes especiais ao comer uma fruta do diabo chamada ""Gomu Gomu no Mi"", que o transforma em um ""homem de borracha"". Isso permite que ele estique seu corpo e tenha habilidades físicas sobre-humanas. No entanto, ele se torna incapaz de nadar, já que as frutas do diabo têm o efeito colateral de anular a habilidade de nadar dos seus consumidores.

                A série explora a complexa política mundial do mundo de One Piece, com o Governo Mundial e a Marinha sendo as principais forças que tentam manter a ordem e caçar os piratas. Também há a presença de Yonkous, os quatro piratas mais poderosos do mundo, e Shichibukais, piratas aliados do Governo Mundial.

                Ao longo da história, são revelados segredos importantes, como a história dos antigos séculos, a existência dos Poneglyphs, escritos ancestrais que contêm informações cruciais, e a verdade por trás da Void Century, um período misterioso da história que foi ocultado pelo Governo Mundial.

                ""One Piece"" é conhecido por sua narrativa rica e cativante, personagens memoráveis, lutas épicas, reviravoltas surpreendentes e um mundo vasto e detalhado. A série tem uma enorme base de fãs em todo o mundo e se tornou uma das franquias de mídia mais populares e bem-sucedidas da história.

                ""One Piece"" é uma série de mangá e anime criada por Eiichiro Oda. Ela conta a história de Monkey D. Luffy, um jovem pirata que está em busca do tesouro lendário conhecido como ""One Piece"". A história se passa em um mundo fictício, onde piratas e a Marinha estão em constante conflito.

                Luffy é o capitão dos Chapéus de Palha, uma tripulação de piratas formada por pessoas com habilidades únicas. Seu objetivo é se tornar o Rei dos Piratas, alcançando o tesouro do One Piece, que está escondido na Grand Line, uma perigosa rota marítima cheia de ilhas misteriosas e desafios.

                Ao longo da jornada, Luffy e sua tripulação enfrentam diversos inimigos poderosos, incluindo outros piratas e marinheiros de alta patente. Eles também encontram aliados leais e formam alianças estratégicas para superar obstáculos.

                O enredo abrange uma ampla variedade de temas, como amizade, coragem, sacrifício, justiça e liberdade. Além disso, cada personagem da tripulação dos Chapéus de Palha tem suas próprias histórias de fundo e motivações individuais.

                Durante a aventura, Luffy ganha poderes especiais ao comer uma fruta do diabo chamada ""Gomu Gomu no Mi"", que o transforma em um ""homem de borracha"". Isso permite que ele estique seu corpo e tenha habilidades físicas sobre-humanas. No entanto, ele se torna incapaz de nadar, já que as frutas do diabo têm o efeito colateral de anular a habilidade de nadar dos seus consumidores.

                A série explora a complexa política mundial do mundo de One Piece, com o Governo Mundial e a Marinha sendo as principais forças que tentam manter a ordem e caçar os piratas. Também há a presença de Yonkous, os quatro piratas mais poderosos do mundo, e Shichibukais, piratas aliados do Governo Mundial.

                Ao longo da história, são revelados segredos importantes, como a história dos antigos séculos, a existência dos Poneglyphs, escritos ancestrais que contêm informações cruciais, e a verdade por trás da Void Century, um período misterioso da história que foi ocultado pelo Governo Mundial.

                ""One Piece"" é conhecido por sua narrativa rica e cativante, personagens memoráveis, lutas épicas, reviravoltas surpreendentes e um mundo vasto e detalhado. A série tem uma enorme base de fãs em todo o mundo e se tornou uma das franquias de mídia mais populares e bem-sucedidas da história.

                ""One Piece"" é uma série de mangá e anime criada por Eiichiro Oda. Ela conta a história de Monkey D. Luffy, um jovem pirata que está em busca do tesouro lendário conhecido como ""One Piece"". A história se passa em um mundo fictício, onde piratas e a Marinha estão em constante conflito.

                Luffy é o capitão dos Chapéus de Palha, uma tripulação de piratas formada por pessoas com habilidades únicas. Seu objetivo é se tornar o Rei dos Piratas, alcançando o tesouro do One Piece, que está escondido na Grand Line, uma perigosa rota marítima cheia de ilhas misteriosas e desafios.

                Ao longo da jornada, Luffy e sua tripulação enfrentam diversos inimigos poderosos, incluindo outros piratas e marinheiros de alta patente. Eles também encontram aliados leais e formam alianças estratégicas para superar obstáculos.

                O enredo abrange uma ampla variedade de temas, como amizade, coragem, sacrifício, justiça e liberdade. Além disso, cada personagem da tripulação dos Chapéus de Palha tem suas próprias histórias de fundo e motivações individuais.

                Durante a aventura, Luffy ganha poderes especiais ao comer uma fruta do diabo chamada ""Gomu Gomu no Mi"", que o transforma em um ""homem de borracha"". Isso permite que ele estique seu corpo e tenha habilidades físicas sobre-humanas. No entanto, ele se torna incapaz de nadar, já que as frutas do diabo têm o efeito colateral de anular a habilidade de nadar dos seus consumidores.

                A série explora a complexa política mundial do mundo de One Piece, com o Governo Mundial e a Marinha sendo as principais forças que tentam manter a ordem e caçar os piratas. Também há a presença de Yonkous, os quatro piratas mais poderosos do mundo, e Shichibukais, piratas aliados do Governo Mundial.

                Ao longo da história, são revelados segredos importantes, como a história dos antigos séculos, a existência dos Poneglyphs, escritos ancestrais que contêm informações cruciais, e a verdade por trás da Void Century, um período misterioso da história que foi ocultado pelo Governo Mundial.

                ""One Piece"" é conhecido por sua narrativa rica e cativante, personagens memoráveis, lutas épicas, reviravoltas surpreendentes e um mundo vasto e detalhado. A série tem uma enorme base de fãs em todo o mundo e se tornou uma das franquias de mídia mais populares e bem-sucedidas da história.

                ""One Piece"" é uma série de mangá e anime criada por Eiichiro Oda. Ela conta a história de Monkey D. Luffy, um jovem pirata que está em busca do tesouro lendário conhecido como ""One Piece"". A história se passa em um mundo fictício, onde piratas e a Marinha estão em constante conflito.

                Luffy é o capitão dos Chapéus de Palha, uma tripulação de piratas formada por pessoas com habilidades únicas. Seu objetivo é se tornar o Rei dos Piratas, alcançando o tesouro do One Piece, que está escondido na Grand Line, uma perigosa rota marítima cheia de ilhas misteriosas e desafios.

                Ao longo da jornada, Luffy e sua tripulação enfrentam diversos inimigos poderosos, incluindo outros piratas e marinheiros de alta patente. Eles também encontram aliados leais e formam alianças estratégicas para superar obstáculos.

                O enredo abrange uma ampla variedade de temas, como amizade, coragem, sacrifício, justiça e liberdade. Além disso, cada personagem da tripulação dos Chapéus de Palha tem suas próprias histórias de fundo e motivações individuais.

                Durante a aventura, Luffy ganha poderes especiais ao comer uma fruta do diabo chamada ""Gomu Gomu no Mi"", que o transforma em um ""homem de borracha"". Isso permite que ele estique seu corpo e tenha habilidades físicas sobre-humanas. No entanto, ele se torna incapaz de nadar, já que as frutas do diabo têm o efeito colateral de anular a habilidade de nadar dos seus consumidores.

                A série explora a complexa política mundial do mundo de One Piece, com o Governo Mundial e a Marinha sendo as principais forças que tentam manter a ordem e caçar os piratas. Também há a presença de Yonkous, os quatro piratas mais poderosos do mundo, e Shichibukais, piratas aliados do Governo Mundial.

                Ao longo da história, são revelados segredos importantes, como a história dos antigos séculos, a existência dos Poneglyphs, escritos ancestrais que contêm informações cruciais, e a verdade por trás da Void Century, um período misterioso da história que foi ocultado pelo Governo Mundial.

                ""One Piece"" é conhecido por sua narrativa rica e cativante, personagens memoráveis, lutas épicas, reviravoltas surpreendentes e um mundo vasto e detalhado. A série tem uma enorme base de fãs em todo o mundo e se tornou uma das franquias de mídia mais populares e bem-sucedidas da história.";

            XFont fonte = new XFont("Arial", 12);
            double margemEsquerda = 40;
            double margemSuperior = 40;
            double larguraPagina = page.Width.Point - (2 * margemEsquerda);
            double alturaPagina = page.Height.Point - (2 * margemSuperior);

            // Divida o texto em linhas com base no tamanho da página
            string[] linhas = QuebrarTextoEmLinhas(textoLongo, fonte, larguraPagina);

            int linhaAtual = 0;
            double posY = margemSuperior;

            // Adicione as linhas à página
            while (linhaAtual < linhas.Length)
            {
                // Crie uma nova página se o texto exceder a altura da página atual
                if (posY + fonte.GetHeight() > alturaPagina)
                {
                    page = document.AddPage();
                    page.Size = PageSize.A4;
                    gfx = XGraphics.FromPdfPage(page);
                    posY = margemSuperior;
                }

                gfx.DrawString(linhas[linhaAtual], fonte, XBrushes.Black,
                    new XRect(margemEsquerda, posY, larguraPagina, alturaPagina),
                    XStringFormats.TopLeft);

                posY += fonte.GetHeight();
                linhaAtual++;
            }

            // Salve o documento PDF
            document.Save(caminho);
            document.Close();

            return caminho;
        }

        // Função para quebrar o texto em linhas com base na largura da página
        private static string[] QuebrarTextoEmLinhas(string texto, XFont fonte, double larguraMax)
        {
            string[] palavras = texto.Split(' ');
            string linhaAtual = "";
            List<string> linhas = new List<string>();

            //foreach (string palavra in palavras)
            //{
            //    if (fonte.MeasureString(linhaAtual + palavra).Width < larguraMax)
            //    {
            //        linhaAtual += palavra + " ";
            //    }
            //    else
            //    {
            //        linhas.Add(linhaAtual);
            //        linhaAtual = palavra + " ";
            //    }
            //}

            if (!string.IsNullOrEmpty(linhaAtual))
            {
                linhas.Add(linhaAtual);
            }

            return linhas.ToArray();
        }
    }
}
