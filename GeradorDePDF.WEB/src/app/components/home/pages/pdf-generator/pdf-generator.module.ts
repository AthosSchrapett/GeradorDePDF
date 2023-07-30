import { SharedModule } from '../../../shared/shared.module';
import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfGeneratorComponent } from './pdf-generator.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormularioModule } from '../../formulario/formulario.module';
import { TxtModule } from '../../txt/txt.module';
import { DownloadModule } from '../../download/download.module';
import { RouterModule } from '@angular/router';
import { PdfGeneratorRoutes } from './pdf-generator.routes';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    SharedModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forChild(PdfGeneratorRoutes)
  ],
  providers: [
    PdfGeneratorService
  ]
})
export class PdfGeneratorModule { }
