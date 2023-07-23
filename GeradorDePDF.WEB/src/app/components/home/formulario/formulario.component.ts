import { PdfGeneratorService } from './../../../services/pdf-generator.service';
import { Component, Input, OnChanges } from '@angular/core';
import { TipoInclusao } from 'src/app/enums/tipo-inclusao.enum';
import { ModelPDF } from 'src/app/models/modelPdf.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalPdfComponent } from '../../shared/modal-pdf/modal-pdf.component';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnChanges {

  constructor(
    private pdfGeneratorService: PdfGeneratorService,
    private _dialog: MatDialog
  ) { }

  ngOnChanges(): void {
    if (this.tipoInclusao !== TipoInclusao.Formulario) {
      this.formulario.get('titulo')?.disable();
      this.formulario.get('conteudo')?.disable();
    }
    else {
      this.formulario.get('titulo')?.enable();
      this.formulario.get('conteudo')?.enable();
    }
  }

  pdfUrl!: string;
  conteudo: string = "";
  exibirModal: boolean = false;

  executaSpinner: boolean = false;

  @Input() tipoInclusao!: TipoInclusao;
  TipoInclusao = TipoInclusao;

  formulario: FormGroup = new FormGroup({
    titulo: new FormControl("", Validators.required),
    conteudo: new FormControl("", Validators.required)
  });

  ajustaTamanhoTextArea(element: HTMLTextAreaElement): void {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  }

  submit(): void {

    this.executaSpinner = true;

    const modelPdf: ModelPDF = new ModelPDF(
      this.formulario.get('titulo')?.value,
      this.formulario.get('conteudo')?.value.split('\n')
    );

    console.log(modelPdf);

    this.pdfGeneratorService.postFormulario(modelPdf).subscribe({
      next: (res: any) => {
        const blob = new Blob([res], { type: "application/pdf" });
        this.pdfUrl = window.URL.createObjectURL(blob);
      },
      error: (e) => {
        console.error(e);
        this.executaSpinner = false;
      },
      complete: () => {
        this.openConfirmationDialog();
        this.formulario.reset();
        this.conteudo = "";
        this.executaSpinner = false;
      }
    })
  }

  openConfirmationDialog(): void {
    this._dialog.open(ModalPdfComponent, {
      data: {
        urlPdf: this.pdfUrl,
      }
    });
  }
}
