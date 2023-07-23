import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-pdf',
  templateUrl: './modal-pdf.component.html',
  styleUrls: ['./modal-pdf.component.css']
})
export class ModalPdfComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      urlPdf: string
    }
  ) {}

  ngOnInit(): void {}

  fecharModal() {
    this.dialogRef.close(false);
  }

}
