import { ProgressService } from './../../../services/progress.service';
import { ModelPDF } from './../../../models/modelPdf.model';
import { Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select'
import { FormsModule } from '@angular/forms';
import { TipoInclusao } from '../../../enums/tipo-inclusao.enum';
import { InputFileComponent } from '../../shared/input-file/input-file.component';
import { InputFormComponent } from '../../shared/input-form/input-form.component';
import { MatButtonModule } from '@angular/material/button';
import { PdfGeneratorService } from '../../../services/pdf-generator.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { SignalRService } from 'src/app/services/signalR.service';

@Component({
  selector: 'app-pdf-generator',
  standalone: true,
  imports: [
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    InputFileComponent,
    InputFormComponent
  ],
  templateUrl: './pdf-generator.component.html',
  styleUrl: './pdf-generator.component.scss'
})
export class PdfGeneratorComponent {

  pdfService = inject(PdfGeneratorService);
  signalRService = inject(SignalRService);
  progressService = inject(ProgressService);
  private _dialog = inject(MatDialog);

  tipoInclusao: TipoInclusao = TipoInclusao.Txt;
  TipoInclusao = TipoInclusao;

  file!: File | undefined;
  modelPdf!: ModelPDF | null;

  pdfUrl: string = "";

  onFileSelected(files: File[]) {
    this.file = files[0];
  }

  onModelPdf(modelPDF: ModelPDF | null) {
    this.modelPdf = modelPDF;
  }

  validaEnvioPdf(): boolean {
    if (this.tipoInclusao === TipoInclusao.Txt) {
      return this.file === undefined
    }
    else {
      return this.modelPdf === null
    }
  }

  alterarSelecao(): void {
    this.tipoInclusao === TipoInclusao.Txt ? this.file = undefined : this.modelPdf = null;
  }

  onSubmit(): void {
    if (this.tipoInclusao === TipoInclusao.Txt) {
      this.postPdfTxt();
    }
    else {
      this.postPdfFormulario();
    }
  }

  postPdfTxt(): void {
    if (this.file) {
      this.iniciaProgressBar();
      const formData = new FormData();
      formData.append('file', this.file, this.file?.name);

      this.pdfService.postTxt(formData).subscribe({
        next: (res: any) => {
          const blob = new Blob([res], { type: "application/pdf" });
          this.pdfUrl = window.URL.createObjectURL(blob);
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => {
          this.openConfirmationDialog();
          this.file = undefined;
        }
      });
    }
  }

  postPdfFormulario(): void {
    this.iniciaProgressBar();
    this.pdfService.postFormulario(this.modelPdf).subscribe({
      next: (res: any) => {
        const blob = new Blob([res], { type: "application/pdf" });
        this.pdfUrl = window.URL.createObjectURL(blob);
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        this.openConfirmationDialog();
        this.modelPdf = null;
      }
    });
  }

  openConfirmationDialog(): void {
    this._dialog.open(ModalComponent, {
      data: {
        urlPdf: this.pdfUrl,
      }
    });
  }

  iniciaProgressBar(): void {
    this.signalRService.progressUpdated$.subscribe(res => {
      this.progressService.progress(res);
    });
  }
}
