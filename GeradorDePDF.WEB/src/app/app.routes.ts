import { Routes } from "@angular/router";

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'pdf-generator',
    pathMatch: 'full'
  },
  {
    path: 'pdf-generator',
    loadChildren: () => import('./components/home/pages/pdf-generator/pdf-generator.module').then(x => x.PdfGeneratorModule)
  },
  {
    path: 'pdf-split',
    loadChildren: () => import('./components/home/pages/pdf-separator/pdf-separator.module').then(x => x.PdfSeparatorModule)
  },
  {
    path: 'pdf-join',
    loadChildren: () => import('./components/home/pages/pdf-combine/pdf-combine.module').then(x => x.PdfCombineModule)
  }
];
