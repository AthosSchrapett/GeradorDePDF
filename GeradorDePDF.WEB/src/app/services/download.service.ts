import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ModelPDF } from '../models/modelPdf.model';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(
    private httpClient: HttpClient
  ) { }

  endpoint: string = `${environment.geradorPdfApi}/Download`;

  downloadGet(): Observable<any> {
    return this.httpClient.get(this.endpoint, { responseType: 'blob' } ).pipe(retry(1));
  }

}
