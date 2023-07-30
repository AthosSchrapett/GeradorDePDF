import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfSeparatorComponent } from './pdf-separator.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared/shared.module';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PdfSeparatorRoutes } from './pdf-separator.routes';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';

@NgModule({
  declarations: [
    PdfSeparatorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    DragDropModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forChild(PdfSeparatorRoutes)
  ],
  providers: [
    PdfGeneratorService
  ]
})
export class PdfSeparatorModule { }
