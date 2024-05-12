import { Component, ElementRef, input, output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-input-file',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.scss'
})
export class InputFileComponent {

  @ViewChild('fileUpload') fileUpload!: ElementRef

  textoSelecao = input("Arquivos");
  validaCampoSelecao = input(false, { transform: (valor: string | boolean) => this.defineInfoCampoValido(valor) });
  deleteButtonLabel = input();
  deleteButtonIcon = input("close");

  accept = input();
  multiple = input(false);
  chooseLabel = input("Arquivo");

  filesSelected = output<File[]>();
  filesRemoved = output();

  files: File[] = [];
  inputFileName: string = "";

  defineInfoCampoValido(valor: string | boolean): boolean {
    return typeof valor === 'string' ? valor === "" || valor === "true" : valor
  }

  onClick() {
    if (this.fileUpload)
      this.fileUpload.nativeElement.click()
  }

  onFileSelected(event: any) {

    let filesTarget = event.dataTransfer ? event.dataTransfer.files : event.target.files;

    for (let i = 0; i < filesTarget.length; i++) {
      this.files.push(filesTarget[i]);
    }

    this.filesSelected.emit(this.files);
  }

  onSelectionChange(): void {
    if (this.files.length === 0) {
      this.fileUpload.nativeElement.value = "";
    }
  }

  removerArquivo(index: number): void {
    this.files.splice(index, 0);
    this.filesSelected.emit(this.files);
    this.filesRemoved.emit();
  }
}
