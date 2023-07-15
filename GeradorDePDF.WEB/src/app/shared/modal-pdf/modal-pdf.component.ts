import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

@Component({
  selector: 'app-modal-pdf',
  templateUrl: './modal-pdf.component.html',
  styleUrls: ['./modal-pdf.component.css']
})
export class ModalPdfComponent {
  @Input() urlPdf: string = "";
  @Input() exibirModal: boolean = false;

  abrirModal() {
    this.exibirModal = true;
  }

  fecharModal() {
    this.exibirModal = false;
  }
}
