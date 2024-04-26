import { Component, ElementRef, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';

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

  sanitizer = inject(DomSanitizer);

  @ViewChild('fileUpload') fileUpload!: ElementRef

  @Input() multiple: boolean = false;
  @Input() accept: any;
  @Input() textoSelecao: string = "Arquivos";
  @Input() validaCampoSelecao: boolean = false;
  @Input() chooseLabel = 'Arquivo'
  @Input() deleteButtonLabel!: string;
  @Input() deleteButtonIcon = 'close'

  files: File[] = [];
  @Output() filesSelected = new EventEmitter<File[]>();
  @Output() filesRemoved = new EventEmitter<File[]>();
  inputFileName!: string;

  onClick() {
    if (this.fileUpload)
      this.fileUpload.nativeElement.click()
  }

  onFileSelected(event: any) {
    let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;

    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      if (this.validate(file)) {
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
        this.files.push(files[i]);
      }
    }
    this.filesSelected.emit(this.files);
  }

  validate(file: File) {
    for (const f of this.files) {
      if (f?.name === file?.name
        && f.lastModified === file.lastModified
        && f.size === f.size
        && f.type === f.type
      ) {
        return false
      }
    }
    return true
  }

  onSelectionChange(): void {
    if(this.files.length === 0){
      this.fileUpload.nativeElement.value = "";
    }
  }

  removerArquivo(index: number): void {
    this.files.splice(index, 1);
    this.filesSelected.emit(this.files);
    this.filesRemoved.emit();
  }
}
