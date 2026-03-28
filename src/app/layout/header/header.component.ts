import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationItem } from '../../core/models/navigation-item.model';
import { NAVIGATION_ITEMS } from '../../core/data/navigation.data';
import { NavigationComponent } from './navigation/navigation.component';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    ThemeToggleComponent,
    NavigationComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  navigation: NavigationItem[] = NAVIGATION_ITEMS;
  isMenuOpen = false;
  headerVariant: string = 'default';

  @ViewChild('menuButton') menuButton!: ElementRef<HTMLButtonElement>;

  constructor(
    private elRef: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let currentRoute = this.route;

        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }

        this.headerVariant =
          currentRoute.snapshot.data['headerVariant'] ?? 'default';

        console.log('headerVariant:', this.headerVariant);
      });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuButton?.nativeElement.focus();
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isMenuOpen) {
      this.closeMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.isMenuOpen) return;

    const clickedInside = this.elRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.closeMenu();
    }
  }
}
