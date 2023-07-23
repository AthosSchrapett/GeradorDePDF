import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';

import { SideNavComponent } from './side-nav.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from 'src/app/app.routes';
import { SharedModule } from '../shared/shared.module';

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
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatListModule,
    RouterModule.forRoot(AppRoutes),
  ]
})
export class SideNavModule { }
