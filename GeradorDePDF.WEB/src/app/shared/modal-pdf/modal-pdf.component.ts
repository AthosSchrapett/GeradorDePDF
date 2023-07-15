import { ModalPdfService } from './modal-pdf.service';
import { Component, Input, OnInit } from '@angular/core';
import { TipoInclusao } from 'src/app/enums/tipo-inclusao.enum';

@Component({
  selector: 'app-modal-pdf',
  templateUrl: './modal-pdf.component.html',
  styleUrls: ['./modal-pdf.component.css']
})
export class ModalPdfComponent implements OnInit {

  constructor(
    private modalPdfService: ModalPdfService
  ) {}

  ngOnInit(): void {
    this.modalPdfService.exibirModal$.subscribe((exibirModal: boolean) => {
      this.exibirModal = exibirModal;
    });

    this.modalPdfService.pdfUrl$.subscribe((urlPdf: string) => {
      this.urlPdf = urlPdf;
    });
  }

  TipoInclusao = TipoInclusao;

  urlPdf: string = "";
  exibirModal: boolean = false;

  fecharModal() {
    this.exibirModal = false;
    this.urlPdf = "";
  }
}
