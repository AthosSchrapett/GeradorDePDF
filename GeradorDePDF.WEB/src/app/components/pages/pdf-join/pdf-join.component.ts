import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';

@Component({
  selector: 'app-pdf-join',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './pdf-join.component.html',
  styleUrl: './pdf-join.component.scss'
})
export class PdfJoinComponent {

  pdfService = inject(PdfGeneratorService);

  paginas: string = "";
  pdf: any;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.pdf = file;
  }

  teste(){
    const formData: FormData = new FormData();
    formData.append("files", this.pdf)
    formData.append("paginas", this.paginas)

    this.pdfService.postJoinPdf(formData).subscribe({
      next: (res) => {
        console.log(res);
      }
    });
  }
}
