import { Routes } from '@angular/router';
import { PdfGeneratorComponent } from './components/pages/pdf-generator/pdf-generator.component';
import { PdfSplitComponent } from './components/pages/pdf-split/pdf-split.component';
import { PdfJoinComponent } from './components/pages/pdf-join/pdf-join.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pdf-generator',
    pathMatch: 'full'
  },
  {
    path: 'pdf-generator',
    component: PdfGeneratorComponent
  },
  {
    path: 'pdf-split',
    component: PdfSplitComponent
  },
  {
    path: 'pdf-join',
    component: PdfJoinComponent
  }
];
