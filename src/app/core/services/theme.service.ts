import { Injectable, signal, effect } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private theme = signal<Theme>('light');

  public readonly current = this.theme.asReadonly();

  constructor() {
    const saved = localStorage.getItem('theme') as Theme | null;
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    this.theme.set(saved ?? system);

    effect(() => {
      const val = this.theme();
      document.documentElement.setAttribute('data-theme', val);
      localStorage.setItem('theme', val);
    });
  }

  toggle() {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }
}
