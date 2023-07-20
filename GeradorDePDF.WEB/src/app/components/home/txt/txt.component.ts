import { ModalPdfService } from './../../shared/modal-pdf/modal-pdf.service';
import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { TipoInclusao } from 'src/app/enums/tipo-inclusao.enum';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';

@Component({
  selector: 'app-txt',
  templateUrl: './txt.component.html',
  styleUrls: ['./txt.component.css']
})
export class TxtComponent {
  selectedFile!: any;
  pdfUrl!: string;
  exibirModal: boolean = false;
  subscription!: Subscription;

  mensagemErro: string = "";

  executaSpinner: boolean = false;

  @Input() tipoInclusao!: TipoInclusao;
  TipoInclusao = TipoInclusao;

  constructor(
    private pdfGeneratorService: PdfGeneratorService,
    private modalPdfService: ModalPdfService
  ) { }

  onFileSelected(input: HTMLInputElement) {
    this.selectedFile = input.files?.[0];
  }

  onUpload() {

    this.executaSpinner = true;

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('files', this.selectedFile, this.selectedFile.name);

      this.subscription = this.pdfGeneratorService.uploadPost(formData)
      .pipe(take(1)).subscribe({
        next: (res: any) => {
          const blob = new Blob([res], { type: "application/pdf" });
          this.pdfUrl = window.URL.createObjectURL(blob);
        },
        error: (e) => {
          console.error(e);
          if (e.status === 406) {
            this.mensagemErro = "Formato do arquivo incorreto";
          }
          this.executaSpinner = false;
          this.selectedFile = null;
          this.modalPdfService.atualizarExibirModal(false);
        },
        complete: () => {

          this.modalPdfService.atualizarExibirModal(true);
          this.modalPdfService.atualizarPdfUrl(this.pdfUrl);

          this.selectedFile = null;
          this.mensagemErro = "";
          this.executaSpinner = false;

          const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
          if (fileInput) {
            fileInput.value = '';
          }

          this.subscription.unsubscribe();
        }
      });
    }
  }
}
