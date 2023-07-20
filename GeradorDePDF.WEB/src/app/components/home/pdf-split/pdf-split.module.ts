import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfSplitComponent } from './pdf-split.component';

@NgModule({
  declarations: [
    PdfSplitComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PdfSplitComponent
  ]
})
export class PdfSplitModule { }
