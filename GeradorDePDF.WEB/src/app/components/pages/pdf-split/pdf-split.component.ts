import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { PdfSplitRequest } from '../../../models/pdf-split-request';
import { PdfGeneratorService } from '../../../services/pdf-generator.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalComponent } from '../../shared/modal/modal.component';
import { take } from 'rxjs';
import * as pdfjsLib from 'pdfjs-dist';
import { InputFileComponent } from '../../shared/input-file/input-file.component';
import { ProgressService } from 'src/app/services/progress.service';
import { SignalRService } from 'src/app/services/signalR.service';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.js';

@Component({
  selector: 'app-pdf-split',
  standalone: true,
  imports: [
    FormsModule,
    DragDropModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    InputFileComponent,
  ],
  templateUrl: './pdf-split.component.html',
  styleUrl: './pdf-split.component.scss'
})
export class PdfSplitComponent {
  @ViewChild('pdfPreview', { static: false }) pdfPreview!: ElementRef;

  pdfPages: string[] = [];
  file!: File | undefined;
  areas: Array<any> = new Array<any>();
  areasExcluidas: Array<any> = new Array<any>();
  pdfSplit: PdfSplitRequest = new PdfSplitRequest();
  paginasSelecao: string = "";
  mensagemErro: string = "";
  mensagemErroSelecaoPaginas: string = "";
  validaExclusaoAreaFinal: boolean = true;

  pdfService = inject(PdfGeneratorService);
  signalRService = inject(SignalRService);
  progressService = inject(ProgressService);
  private _dialog = inject(MatDialog);

  onFileSelected(files: any) {
    if (!(files?.[0] === undefined)) {
      this.areasExcluidas = [];
    }

    const file = files?.[0];
    this.file = file;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const pdfUrl = reader.result;
        this.generatePdfPreview(pdfUrl as string, 700, 800);
      };
      reader.readAsDataURL(file);
    }
  }

  onFileRemoved(): void {
    this.file = undefined;
    this.areas = new Array<Array<string>>();
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
    if (event.previousContainer !== event.container)
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
    this.areas.forEach((area) => {
      if (area.pages.length === 0) {
        this.areasExcluidas.push(area);
      }
    });

    if (this.areas.length === 1) {
      this.validaExclusaoAreaFinal = false;
    }
    else {
      this.validaExclusaoAreaFinal = true;
    }

    if (this.validaExclusaoAreaFinal) {
      this.areasExcluidas.forEach(areaExcluida => {
        this.areas.forEach((area, index) => {
          if (area.id === areaExcluida.id && area.pages.length === 0) {
            this.areas.splice(index, 1);
          }
        });
      });
    }
  }

  selecionarPaginas(areaId: string, paginaSelecaoInicial: any, paginaSelecaoFinal: any): void {

    let paginaInicial: number = Number.parseInt(paginaSelecaoInicial.value);
    let paginaFinal: number = Number.parseInt(paginaSelecaoFinal.value);

    if(paginaInicial === 0 || paginaFinal === 0){
      this.mensagemErroSelecaoPaginas = "Página zero não existe.";
    }
    else if(paginaInicial > paginaFinal && paginaSelecaoFinal !== ''){
      this.mensagemErroSelecaoPaginas = "Pagina inicial deve ser menor que a final";
    }
    else{
      this.mensagemErroSelecaoPaginas = "";
      let paginasRemovidas: Array<any> = new Array<any>();

      for (let i = paginaInicial - 1; i < paginaFinal; i++) {
        this.areas.forEach((area, indexArea) => {
          area.pages.forEach((page: any, indexPage: number) => {

            if (page.number === i && area.id !== areaId) {
              paginasRemovidas.push(page);
              this.areas[indexArea].pages.splice(indexPage, 1);
            }

          });
        });
      }

      this.areas.forEach((area) => {
        if (area.id === areaId) {
          paginasRemovidas.forEach(pagina => {
            area.pages.push(pagina);
          });
        }
      });

      this.ordenarPaginas();
      this.removerAreasVazias();

      paginaSelecaoInicial.value = "";
      paginaSelecaoFinal.value = "";
    }
  }

  criarNovaArea(): void {

    const validaAreaInclusao = !(this.areas.some(x => x.pages.length === 0) && this.areasExcluidas.length > 0);

    if (validaAreaInclusao) {
      this.areas.push(this.areasExcluidas[0]);
      this.areasExcluidas.splice(0, 1);
    }
  }

  submit(): void {
    this.pdfSplit = new PdfSplitRequest();

    if (this.file) {

      this.iniciaProgressBar();
      const formData = new FormData();
      formData.append('file', this.file, this.file.name);
      this.pdfSplit.file = formData;

      this.areas.forEach(element => {
        if (element.pages.length > 0) {
          this.pdfSplit.paginas.push(element.pages.map((valor: any) => valor.number).join(','))
        }
      });

      this.pdfService.postSplitPdf(this.pdfSplit)
        .pipe(take(1)).subscribe({
          next: (res: any) => {
            const blob = new Blob([res], { type: "application/zip" });
            const urlBlob = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = urlBlob;
            link.click();
            URL.revokeObjectURL(urlBlob);
          },
          error: (e: any) => {
            console.error(e);
            if (e.status === 406) {
              this.mensagemErro = "Formato do arquivo incorreto";
            }
            this.file = undefined;
            this.areas = [];
          },
          complete: () => {
            this.file = undefined;
            this.areas = [];
          }
        });
    }
  }

  showImageInLightbox(imageSrc: string): void {
    this._dialog.open(ModalComponent, {
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

  iniciaProgressBar(): void {
    this.signalRService.progressUpdated$.subscribe(res => {
      this.progressService.progress(res);
    });
  }
}
