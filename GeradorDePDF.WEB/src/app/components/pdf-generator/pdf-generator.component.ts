import { PdfGeneratorService } from './../../services/pdf-generator.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.css']
})
export class PdfGeneratorComponent {

  selectedFile!: any;
  pdfUrl!: string;

  constructor(
    private pdfGeneratorService: PdfGeneratorService
  ) {}

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }

  onUpload(){
    if(this.selectedFile){
      const formData = new FormData();
      formData.append('files', this.selectedFile, this.selectedFile.name);

      this.pdfGeneratorService.uploadPost(formData).subscribe({
        next: (res: any) => {
          const blob = new Blob([res], { type: "application/pdf" });
          this.pdfUrl = window.URL.createObjectURL(blob);
          window.open(this.pdfUrl);
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => {
          this.selectedFile = null;
        }
      });
    }
  }

}
