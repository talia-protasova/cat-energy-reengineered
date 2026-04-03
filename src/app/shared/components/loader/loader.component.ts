import { Component, effect, inject, input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  readonly isLoading = input(false);

  private readonly document = inject(DOCUMENT);

  constructor() {
    effect(() => this.toggleScroll(this.isLoading()));
  }

  ngOnDestroy(): void {
    this.toggleScroll(false);
  }

  private toggleScroll(disable: boolean): void {
    const action = disable ? 'add' : 'remove';
    this.document.body.classList[action]('no-scroll');
    this.document.documentElement.classList[action]('no-scroll');
  }
}
