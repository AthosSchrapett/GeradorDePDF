import { SharedModule } from './../../shared/shared.module';
import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfGeneratorComponent } from './pdf-generator.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormularioModule } from '../formulario/formulario.module';
import { TxtModule } from '../txt/txt.module';
import { DownloadModule } from '../download/download.module';
import { PdfSplitModule } from '../pdf-split/pdf-split.module';
import { RouterModule } from '@angular/router';
import { PdfGeneratorRoutes } from './pdf-generator.routes';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';

@NgModule({
  declarations: [
    PdfGeneratorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    FormularioModule,
    TxtModule,
    DownloadModule,
    PdfSplitModule,
    SharedModule,
    RouterModule.forChild(PdfGeneratorRoutes)
  ],
  providers: [
    PdfGeneratorService
  ]
})
export class PdfGeneratorModule { }
