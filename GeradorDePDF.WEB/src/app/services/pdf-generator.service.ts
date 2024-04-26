import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { ModelPDF } from '../models/modelPdf.model';
import { environment } from '../../environments/environment.development';
import { PdfSplitRequest } from '../models/pdf-split-request';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  httpClient = inject(HttpClient);

  endpoint: string = `${environment.geradorPdfApi}/pdf`;

  postTxt(formData: any): Observable<any> {
    let url: string = `${this.endpoint}/txt`
    return this.httpClient.post(url, formData, { responseType: 'blob' } ).pipe(retry(1));
  }

  postFormulario(modelPdf: ModelPDF | null): Observable<any> {
    let url: string = `${this.endpoint}/formulario`
    return this.httpClient.post(url, modelPdf, { responseType: 'blob' }).pipe(retry(1));
  }

  postSplitPdf(splitPdfRequestModel: PdfSplitRequest): Observable<any> {
    let url: string = `${this.endpoint}/split-pdf`
    const formData = splitPdfRequestModel.file;

    for (const pagina of splitPdfRequestModel.paginas) {
      formData.append('paginas', pagina);
    }

    return this.httpClient.post(url, formData, { responseType: 'blob' }).pipe(retry(1));
  }
}
