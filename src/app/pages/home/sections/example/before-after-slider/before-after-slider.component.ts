import { Component, HostListener, signal } from '@angular/core';

const BREAKPOINT_DESKTOP = 1024;

const SLIDER_MIN = 0;
const SLIDER_MAX = 100;
const SLIDER_STEP = 1;

const SLIDER_INITIAL_MOBILE = 0;
const SLIDER_INITIAL_DESKTOP = 50;

@Component({
  selector: 'app-before-after-slider',
  standalone: true,
  templateUrl: './before-after-slider.component.html',
  styleUrl: './before-after-slider.component.scss',
})
export class BeforeAfterSliderComponent {
  readonly value = signal(SLIDER_INITIAL_DESKTOP);

  constructor() {
    this.setInitialValue();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.setInitialValue();
  }

  private setInitialValue(): void {
    this.value.set(
      window.innerWidth < BREAKPOINT_DESKTOP
        ? SLIDER_INITIAL_MOBILE
        : SLIDER_INITIAL_DESKTOP,
    );
  }

  sliderPercent(): string {
    return `${this.value()}%`;
  }

  onSliderChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value.set(Number(input.value));
  }

  onKeyDown(event: KeyboardEvent): void {
    const current = this.value();

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        this.value.set(Math.max(SLIDER_MIN, current - SLIDER_STEP));
        break;

      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        this.value.set(Math.min(SLIDER_MAX, current + SLIDER_STEP));
        break;

      case 'Home':
        event.preventDefault();
        this.value.set(SLIDER_MIN);
        break;

      case 'End':
        event.preventDefault();
        this.value.set(SLIDER_MAX);
        break;
    }
  }

  setBefore(): void {
    this.value.set(SLIDER_MIN);
  }

  setAfter(): void {
    this.value.set(SLIDER_MAX);
  }
}
