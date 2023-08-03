import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css']
})
export class InputFileComponent {
  selectedFile!: any;
  fileName: string = "";

  @Output() submit = new EventEmitter<any>();

  onFileSelected(input: HTMLInputElement): void {
    this.selectedFile = input.files?.[0];
    this.fileName = this.selectedFile ? this.selectedFile.name : null;
  }

  onSubmit(): void {
    this.submit.emit(this.selectedFile);
    console.log("teste");
  }
}
