import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { ModalPdfComponent } from './modal-pdf/modal-pdf.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import { InputFileComponent } from './input-file/input-file.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ModalPdfComponent,
    InputFileComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    NgxExtendedPdfViewerModule,
  ],
  exports: [
    SpinnerComponent,
    ModalPdfComponent,
    InputFileComponent
  ]
})
export class SharedModule { }
