import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalPdfService {
  constructor() { }

  private exibirModalSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private pdfUrlSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  exibirModal$: Observable<boolean> = this.exibirModalSubject.asObservable();
  pdfUrl$: Observable<string> = this.pdfUrlSubject.asObservable();

  atualizarExibirModal(exibirModal: boolean): void {
    this.exibirModalSubject.next(exibirModal);
  }

  atualizarPdfUrl(urlPdf: string): void {
    this.pdfUrlSubject.next(urlPdf);
  }
}
