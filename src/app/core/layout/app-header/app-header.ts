import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  NavigationSkipped,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, TranslocoPipe],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(keydown.escape)': 'handleEscape($event)',
    '(window:resize)': 'handleWindowResize()',
  },
})
export class AppHeader {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private readonly menuButton = viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');

  readonly isMenuOpen = signal(false);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd || event instanceof NavigationSkipped),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        if (this.isMenuOpen()) {
          this.closeMenu();
          this.document.getElementById('main-content')?.focus();
        }
      });
  }

  toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  handleEscape(event: Event): void {
    if (!this.isMenuOpen()) {
      return;
    }

    event.preventDefault();
    this.closeMenu();
    this.menuButton().nativeElement.focus();
  }

  handleWindowResize(): void {
    const isDesktop = this.document.defaultView?.matchMedia?.('(min-width: 48rem)').matches;

    if (isDesktop) {
      this.closeMenu();
    }
  }
}
