import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    NgxExtendedPdfViewerModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnDestroy {

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      urlPdf: string,
      image: string
    }
  ) {
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
  }

  ngOnDestroy(): void {
  }

  fecharModal() {
    this.dialogRef.close(false);
    this.data.urlPdf = "";
    this.data.image = "";
    this.ngOnDestroy();
  }
}
