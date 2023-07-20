import { PdfGeneratorService } from './../../../services/pdf-generator.service';
import { Component, Input } from '@angular/core';
import { TipoInclusao } from 'src/app/enums/tipo-inclusao.enum';
import { ModelPDF } from 'src/app/models/modelPdf.model';
import { ModalPdfService } from 'src/app/components/shared/modal-pdf/modal-pdf.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  constructor(
    private pdfGeneratorService: PdfGeneratorService,
    private modalPdfService: ModalPdfService
  ) { }

  pdfUrl!: string;
  modelPdf: ModelPDF = new ModelPDF();
  conteudo: string = "";
  exibirModal: boolean = false;

  executaSpinner: boolean = false;

  @Input() tipoInclusao!: TipoInclusao;
  TipoInclusao = TipoInclusao;

  ajustaTamanhoTextArea(element: any): void {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  }

  submit(): void {

    this.executaSpinner = true;

    this.conteudo.split('\n').forEach(
      element => this.modelPdf.conteudo.push(element)
    );

    this.pdfGeneratorService.postFormulario(this.modelPdf).subscribe({
      next: (res: any) => {
        const blob = new Blob([res], { type: "application/pdf" });
        this.pdfUrl = window.URL.createObjectURL(blob);
      },
      error: (e) => {
        console.error(e);
        this.executaSpinner = false;
        this.modalPdfService.atualizarExibirModal(false);
      },
      complete: () => {
        this.modalPdfService.atualizarExibirModal(true);
        this.modalPdfService.atualizarPdfUrl(this.pdfUrl);

        this.modelPdf = new ModelPDF();
        this.conteudo = "";
        this.executaSpinner = false;
      }
    })
  }
}
