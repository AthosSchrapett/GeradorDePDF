import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProgressComponent } from './components/shared/progress/progress.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NgxSpinnerModule,
    SideNavComponent,
    ProgressComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GeradorDePDF.WEB';
}
