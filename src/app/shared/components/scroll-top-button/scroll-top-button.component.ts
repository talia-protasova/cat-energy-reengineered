import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-scroll-top-button',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './scroll-top-button.component.html',
  styleUrl: './scroll-top-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollTopButtonComponent {
  private readonly scrollService = inject(ScrollService);

  readonly isVisible$ = this.scrollService.isScrolledBeyond(600);

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
