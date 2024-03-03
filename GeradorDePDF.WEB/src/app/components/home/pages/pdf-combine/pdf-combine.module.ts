import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfCombineComponent } from './pdf-combine.component';
import { RouterModule } from '@angular/router';
import { PdfCombineRoutes } from './pdf-combine.routes';



@NgModule({
  declarations: [
    PdfCombineComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PdfCombineRoutes)
  ]
})
export class PdfCombineModule { }
