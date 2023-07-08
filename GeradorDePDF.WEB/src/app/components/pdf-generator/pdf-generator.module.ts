import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfGeneratorComponent } from './pdf-generator.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PdfGeneratorComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    PdfGeneratorComponent
  ]
})
export class PdfGeneratorModule { }
