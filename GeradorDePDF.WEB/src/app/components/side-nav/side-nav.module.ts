import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from 'src/app/app.routes';
import { PdfGeneratorModule } from '../home/pdf-generator/pdf-generator.module';

@NgModule({
  declarations: [
    SideNavComponent
  ],
  exports:[
    SideNavComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
  ]
})
export class SideNavModule { }
