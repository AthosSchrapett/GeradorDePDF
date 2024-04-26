import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ModelPDF } from '../../../models/modelPdf.model';

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss'
})
export class InputFormComponent implements AfterViewChecked {

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.enviarPdf();
    }, 1000);
  }

  formBuilder = inject(FormBuilder);
  changeDetectorRef = inject(ChangeDetectorRef);

  @Output() modelPdf = new EventEmitter<ModelPDF | null>();

  formulario: any = this.formBuilder.group({
    titulo: ["", Validators.required],
    conteudo: ["", Validators.required]
  });

  ajustaTamanhoTextArea(element: HTMLTextAreaElement): void {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  }

  enviarPdf(): void {
    if(!this.formulario.invalid){
      const modelPdf: ModelPDF = new ModelPDF(
        this.formulario.get('titulo')?.value,
        this.formulario.get('conteudo')?.value.split('\n')
      );
      this.modelPdf.emit(modelPdf);
    }
    else {
      this.modelPdf.emit(null);
    }
  }

}
