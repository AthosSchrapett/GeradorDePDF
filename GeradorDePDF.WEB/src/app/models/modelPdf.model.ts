export class ModelPDF {
  titulo: string = "";
  conteudo: Array<string> = new Array<string>();

  constructor(titulo: string, conteudo: Array<string>) {
    this.titulo = titulo,
    this.conteudo = conteudo
  }
}
