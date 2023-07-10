import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TxtComponent } from './txt.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TxtComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TxtComponent
  ]
})
export class TxtModule { }
