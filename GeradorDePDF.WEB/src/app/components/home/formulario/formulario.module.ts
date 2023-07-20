import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormularioComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
  ],
  exports: [
    FormularioComponent
  ]
})
export class FormularioModule { }