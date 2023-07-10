import { TipoInclusao } from 'src/app/enums/tipo-inclusao.enum';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.css']
})
export class PdfGeneratorComponent {
  tipoInclusao!: TipoInclusao;
  TipoInclusao = TipoInclusao;
}
