import { Component, Input } from '@angular/core';
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

  mensagemErro: string = "";

  executaSpinner: boolean = false;

  @Input() tipoInclusao!: TipoInclusao;
  TipoInclusao = TipoInclusao;

  constructor(
    private pdfGeneratorService: PdfGeneratorService
  ) {}

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }

  onUpload(){

    this.executaSpinner = true;

    if(this.selectedFile){
      const formData = new FormData();
      formData.append('files', this.selectedFile, this.selectedFile.name);

      this.pdfGeneratorService.uploadPost(formData).subscribe({
        next: (res: any) => {
          const blob = new Blob([res], { type: "application/pdf" });
          this.pdfUrl = window.URL.createObjectURL(blob);
        },
        error: (e) => {
          console.error(e);
          if (e.status === 406){
            this.mensagemErro = "Formato do arquivo incorreto";
          }
          this.executaSpinner = false;
          this.selectedFile = null;
        },
        complete: () => {
          this.exibirModal = true;
          this.selectedFile = null;
          this.mensagemErro = "";
          this.executaSpinner = false;
        }
      });
    }
  }
}
