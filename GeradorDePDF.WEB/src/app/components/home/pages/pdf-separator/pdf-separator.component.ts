import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { take } from 'rxjs';
import { PdfSplitRequest } from 'src/app/models/pdf-split-Request.model';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.js';

@Component({
  selector: 'app-pdf-separator',
  templateUrl: './pdf-separator.component.html',
  styleUrls: ['./pdf-separator.component.css'],
})

export class PdfSeparatorComponent {
  @ViewChild('pdfPreview', { static: false }) pdfPreview!: ElementRef;

  pdfPages: string[] = [];
  selectedFile!: any;
  areas: Array<any> = new Array<any>();
  pdfSplit: PdfSplitRequest = new PdfSplitRequest();
  mensagemErro: string = "";
  fileName: string = "";
  executaSpinner: boolean = false;

  constructor(
    private pdfGeneratorService: PdfGeneratorService,
  ) { }

  onFileSelected(input: HTMLInputElement) {
    const file = input.files?.[0];
    this.selectedFile = file;
    this.fileName = this.selectedFile ? this.selectedFile.name : null;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const pdfUrl = reader.result;
        this.generatePdfPreview(pdfUrl as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async generatePdfPreview(pdfUrl: string) {
    const canvasSize = { width: 200, height: 300 };

    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
    const totalPages = pdf.numPages;

    this.pdfPages = [];
    this.areas = new Array<Array<string>>();

    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1 });
      const scale = Math.min(canvasSize.width / viewport.width, canvasSize.height / viewport.height);
      const scaledViewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;
      const context = canvas.getContext('2d');

      const renderContext: any = {
        canvasContext: context,
        viewport: scaledViewport
      };
      await page.render(renderContext).promise;

      const imgData = canvas.toDataURL('image/png');

      this.pdfPages.push(imgData);
    }

    this.createArea();
  }

  createArea(): void {
    this.areas = this.pdfPages.map((page, index) => (
      { id: `area_${index}`, pages: [{ newPage: page, number: index }] }
    ));
  }

  getConnectedList(id: string): string[] {

    let ids_areas: string[] = [];

    this.areas.forEach(element => {
      if (element.id !== id) {
        ids_areas.push(element.id)
      }
    });

    return ids_areas;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.ordenarPaginas();
  }

  ordenarPaginas() {
    this.areas.forEach(area => {
      area.pages.sort((a: any, b: any) => {
        return a.number - b.number;
      });
    });
  }

  submit(): void {

    this.pdfSplit = new PdfSplitRequest();

    if (this.selectedFile) {

      this.executaSpinner = true;

      const formData = new FormData();
      formData.append('files', this.selectedFile, this.selectedFile.name);
      this.pdfSplit.files = formData;

      this.areas.forEach(element => {
        if (element.pages.length > 0) {
          this.pdfSplit.ranges.push(element.pages.map((valor: any) => ++valor.number).join(','))
        }
      });

      this.pdfGeneratorService.postSplitPdf(this.pdfSplit)
        .pipe(take(1)).subscribe({
          next: (res: any) => {
            const blob = new Blob([res], { type: "application/zip" });
            const urlBlob = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = urlBlob;
            link.click();
            URL.revokeObjectURL(urlBlob);
          },
          error: (e) => {
            console.error(e);
            if (e.status === 406) {
              this.mensagemErro = "Formato do arquivo incorreto";
            }
            this.selectedFile = null;
            this.fileName = "";
            this.areas = [];
            this.executaSpinner = false;
          },
          complete: () => {
            this.selectedFile = null;
            this.areas = [];
            this.fileName = "";
            this.executaSpinner = false;
          }
        });
      }
    }
}
