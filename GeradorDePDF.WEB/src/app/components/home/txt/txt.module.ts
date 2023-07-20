import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TxtComponent } from './txt.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  declarations: [
    TxtComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    TxtComponent
  ]
})
export class TxtModule { }
