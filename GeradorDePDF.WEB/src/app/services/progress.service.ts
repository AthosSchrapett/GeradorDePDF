import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private _loading = new BehaviorSubject<boolean>(false);
  private _progressValue = new BehaviorSubject<number>(0);

  loading$ = this._loading.asObservable();
  progressValue$ = this._progressValue.asObservable();

  progress(progress: number) {
    this._loading.next(true);
    this._progressValue.next(progress);
    let interval = setInterval(() => {
      if(progress === 100){
        clearInterval(interval);
        this.hide();
      }
    }, 1000);
  }

  hide() {
    this._loading.next(false);
  }
}
