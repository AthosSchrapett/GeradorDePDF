import { SharedModule } from './../../shared/shared.module';
import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfGeneratorComponent } from './pdf-generator.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormularioModule } from '../formulario/formulario.module';
import { TxtModule } from '../txt/txt.module';
import { DownloadModule } from '../download/download.module';
import { PdfSplitModule } from '../pdf-split/pdf-split.module';

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
    DownloadModule,
    PdfSplitModule,
    SharedModule
  ],
  exports: [
    PdfGeneratorComponent
  ]
})
export class PdfGeneratorModule { }
