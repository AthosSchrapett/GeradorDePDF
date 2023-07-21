import { Routes } from "@angular/router";

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'pdf-generator',
    pathMatch: 'full'
  },
  {
    path: 'pdf-generator',
    loadChildren: () => import('../app/components/home/pdf-generator/pdf-generator.module').then(x => x.PdfGeneratorModule)
  }
];
