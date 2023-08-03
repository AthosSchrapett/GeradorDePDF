import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, take } from 'rxjs';
import { TipoInclusao } from 'src/app/enums/tipo-inclusao.enum';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';
import { ModalPdfComponent } from '../../shared/modal-pdf/modal-pdf.component';

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

  fileName!: string;

  @Input() tipoInclusao!: TipoInclusao;
  TipoInclusao = TipoInclusao;

  constructor(
    private pdfGeneratorService: PdfGeneratorService,
    private _dialog: MatDialog
  ) { }

  onFileSelected(input: any): void {
    this.selectedFile = input.files?.[0];
    this.fileName = this.selectedFile ? this.selectedFile.name : null;
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
          this.fileName = "";
        },
        complete: () => {

          this.openConfirmationDialog();

          this.selectedFile = null;
          this.mensagemErro = "";
          this.executaSpinner = false;
          this.fileName = "";

          const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
          if (fileInput) {
            fileInput.value = '';
          }

          this.subscription.unsubscribe();
        }
      });
    }
  }

  openConfirmationDialog(): void {
    this._dialog.open(ModalPdfComponent, {
      data: {
        urlPdf: this.pdfUrl,
      }
    });
  }
}
