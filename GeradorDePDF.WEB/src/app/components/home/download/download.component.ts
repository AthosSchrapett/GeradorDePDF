import { Component } from '@angular/core';
import { DownloadService } from 'src/app/services/download.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent {

  constructor(private downloadService: DownloadService)
  {}

  downloadModelo(): void {
    this.downloadService.downloadGet().subscribe({
      next: (res: any) => {
        const blob = new Blob([res], { type: "application/txt" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = 'modelo.txt';
        link.click();

        window.URL.revokeObjectURL(url);
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
      }
    });
  }
}
