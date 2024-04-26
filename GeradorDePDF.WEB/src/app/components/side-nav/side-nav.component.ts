import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { rotateAnimation } from '../../animations/animations';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatListModule,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
  animations: [rotateAnimation]
})
export class SideNavComponent implements OnInit {

  ngOnInit(): void {
    if (typeof window !== "undefined")
      this.adjustMenuState(window.innerWidth);
  }

  isMenuOpen: boolean = true;
  mode: string = "Dark Mode";

  clickedToogle: boolean = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.clickedToogle = true;
  }

  isDark: boolean = true;

  private adjustMenuState(windowWidth: number): void {
    this.isMenuOpen = windowWidth < 656 ? false : true;
  }

  @HostBinding('class')
  get themeMode() {
    this.mode = this.isDark ? "Dark Mode" : "Light Mode";
    return this.isDark ? 'dark-theme' : 'ligth-theme';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width = event.target.innerWidth;
    this.isMenuOpen = width < 656 ? false : true;
  }

}
