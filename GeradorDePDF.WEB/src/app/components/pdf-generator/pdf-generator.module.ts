import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfGeneratorComponent } from './pdf-generator.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormularioModule } from '../formulario/formulario.module';
import { TxtModule } from '../txt/txt.module';

@NgModule({
  declarations: [
    PdfGeneratorComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FormularioModule,
    TxtModule,
  ],
  exports: [
    PdfGeneratorComponent
  ]
})
export class PdfGeneratorModule { }
