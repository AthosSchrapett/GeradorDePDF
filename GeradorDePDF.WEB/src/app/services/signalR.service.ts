import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import * as signalR from "@microsoft/signalr";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  httpClient = inject(HttpClient);
  endpoint: string = `${environment.signalR}/progressHub`;

  private hubConnection!: signalR.HubConnection;
  private progressSubject = new Subject<number>();
  progressUpdated$: Observable<number> = this.progressSubject.asObservable();

  constructor() {
    console.log(this.endpoint);
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withStatefulReconnect()
      .withUrl(this.endpoint)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Conexão iniciada'))
      .catch(err => console.log('Erro ao iniciar a conexão: ' + err));

    this.hubConnection.on('ReceiveProgress', (progress: number) => {
      this.progressSubject.next(progress);
    });
  }

  progressBarTxt(): void {
    this.progressUpdated$.subscribe(res => console.log(res));
  }
}
