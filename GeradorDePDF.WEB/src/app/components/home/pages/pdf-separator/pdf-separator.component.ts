import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as pdfjsLib from 'pdfjs-dist';
import { take } from 'rxjs';
import { ModalImageComponent } from 'src/app/components/shared/modal-image/modal-image.component';
import { ModalPdfComponent } from 'src/app/components/shared/modal-pdf/modal-pdf.component';
import { TipoModal } from 'src/app/enums/tipo-modal.enum';
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
  areasExcluidas: Array<any> = new Array<any>();
  pdfSplit: PdfSplitRequest = new PdfSplitRequest();
  mensagemErro: string = "";
  fileName: string = "";
  executaSpinner: boolean = false;

  paginasSelecao: string = "";

  constructor(
    private pdfGeneratorService: PdfGeneratorService,
    private _dialog: MatDialog
  ) { }

  onFileSelected(input: HTMLInputElement) {
    const file = input.files?.[0];
    this.selectedFile = file;
    this.fileName = this.selectedFile ? this.selectedFile.name : null;

    if (file) {
      this.executaSpinner = true;
      const reader = new FileReader();
      reader.onload = () => {
        const pdfUrl = reader.result;
        this.generatePdfPreview(pdfUrl as string, 700, 800);
      };
      reader.readAsDataURL(file);
    }
  }

  async generatePdfPreview(pdfUrl: string, width: number, height: number) {
    const canvasSize = { width: width, height: height };

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

    this.executaSpinner = false;
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
    if(event.previousContainer !== event.container)
      this.removerAreasVazias();
  }

  ordenarPaginas(): void {
    this.areas.forEach(area => {
      area.pages.sort((a: any, b: any) => {
        return a.number - b.number;
      });
    });
  }

  removerAreasVazias(): void {
    this.areas.forEach((area, index) => {
      if(area.pages.length === 0){
        this.areasExcluidas.push(area);
        this.areas.splice(index, 1);
      }
    });
  }

  selecionarPaginas(areaId: string, paginasSelecao: string): void {
    if(this.validarFormatoPaginas(paginasSelecao)){
      let paginasRemovidas: Array<any> = new Array<any>();
      let paginas = paginasSelecao.split(',').map(x => (Number.parseInt(x) - 1).toString());

      this.areas.forEach((area, indexArea) => {
        area.pages.forEach((page: any, indexPage: number) => {
          if(paginas.includes(page.number.toString()) && area.id !== areaId){
            paginasRemovidas.push(page);
            this.areas[indexArea].pages.splice(indexPage, 1);
          }
        });
      });

      this.areas.forEach((area) => {
        if(area.id === areaId){
          paginasRemovidas.forEach(pagina => {
            area.pages.push(pagina);
          });
        }
      });
      this.ordenarPaginas();
      this.removerAreasVazias();
    }
  }

  criarNovaArea(): void {
    if(this.areasExcluidas.length > 0){
      this.areas.push(this.areasExcluidas[0]);
      this.areasExcluidas.splice(0, 1);
    }
  }

  submit(): void {
    this.pdfSplit = new PdfSplitRequest();

    if (this.selectedFile) {

      this.executaSpinner = true;

      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.pdfSplit.file = formData;

      this.areas.forEach(element => {
        if (element.pages.length > 0) {
          this.pdfSplit.paginas.push(element.pages.map((valor: any) => valor.number).join(','))
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

  currentImage!: string | null;
  showImageInLightbox(imageSrc: string): void {
    this._dialog.open(ModalImageComponent, {
      data: {
        image: imageSrc
      }
    });
  }

  reorganizacaoDeAreas(idArea: any, range: string): void {

    let paginasSelecionadas: number[] = range.split(",").map(str => parseInt(str));
    let paginasReorganizadas: object[] = []

    this.areas.forEach(element => {
      const novasPaginas = element.pages.filter((x: any) => paginasSelecionadas.includes(x.number));
      if (novasPaginas.length > 0) {
        paginasReorganizadas.push(novasPaginas);

        novasPaginas.forEach((page: any) => {
          console.log(page);
          const indice = element.pages.findIndex((pageIndex: any) => pageIndex.number === page.number);
          element.pages.splice(indice, 1);
        });
      }
    });

    this.areas.forEach(element => {
      if (element.id === idArea) {
        paginasReorganizadas.forEach((page: any) => {
          element.pages.push(page[0]);
        });
      }
    });
  }

  validarFormatoPaginas(paginasSelecao: string): boolean {

    if (paginasSelecao.trim() === "") {
      return true;
    }

    const pattern = /^\d+(,\s*\d+)*(,\s*\d+)?$/;
    return pattern.test(paginasSelecao);
  }
}
