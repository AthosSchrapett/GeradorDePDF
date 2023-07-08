import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/app/environments/environment';

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
}
