import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ModelPDF } from '../models/modelPdf.model';
import { PdfSplitRequest } from '../models/pdf-split-Request.model';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor(
    private httpClient: HttpClient
  ) { }

  endpoint: string = `${environment.geradorPdfApi}/Pdf`;

  uploadPost(formData: any): Observable<any> {
    return this.httpClient.post(this.endpoint, formData, { responseType: 'blob' } ).pipe(retry(1));
  }

  postFormulario(modelPdf: ModelPDF): Observable<any> {
    let url: string = `${this.endpoint}/formulario`
    return this.httpClient.post(url, modelPdf, { responseType: 'blob' }).pipe(retry(1));
  }

  postSplitPdf(splitPdfRequestModel: PdfSplitRequest): Observable<any> {
    let url: string = `${this.endpoint}/split-pdf`

    const formData = new FormData();
    for (const file of splitPdfRequestModel.files.getAll('files')) {
      formData.append('files', file);
    }

    for (const range of splitPdfRequestModel.ranges) {
      formData.append('ranges', range);
    }

    return this.httpClient.post(url, formData, { responseType: 'blob' }).pipe(retry(1));
  }
}
