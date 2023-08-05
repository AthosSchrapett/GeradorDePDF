import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { rotateAnimation } from 'src/app/animations/animations';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  animations: [rotateAnimation]
})
export class SideNavComponent implements OnInit {

  ngOnInit(): void {
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
