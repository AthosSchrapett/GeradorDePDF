import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatProgressBarModule, ProgressBarMode } from '@angular/material/progress-bar';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { ProgressService } from 'src/app/services/progress.service';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [
    NgxSpinnerModule,
    MatProgressBarModule,
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent implements OnInit, OnDestroy {

  spinner = inject(NgxSpinnerService);

  ngOnDestroy(): void {
    this.spinner.hide();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.spinner.show();
    this.subscriptions.push(
      this.progressService.loading$.subscribe(loading => this.loading = loading),
      this.progressService.progressValue$.subscribe(value => {
        this.progressValue = value;
        this.bufferValue = value + 5;
      })
    );
  }

  loading = false;
  progressValue = 0;
  private subscriptions: Subscription[] = [];

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'buffer';
  bufferValue: number = 0;

  progressService = inject(ProgressService);

}
