import { DOCUMENT } from '@angular/common';
import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';

import type { ResolvedTheme, ThemeMode } from './theme.types';

const THEME_STORAGE_KEY = 'cat-energy-theme';
const DARK_MODE_QUERY = '(prefers-color-scheme: dark)';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  private readonly mediaQuery = this.getMediaQuery();

  private readonly themePreference = signal<ThemeMode>(this.readStoredPreference());

  private readonly systemTheme = signal<ResolvedTheme>(this.mediaQuery?.matches ? 'dark' : 'light');

  readonly preference = this.themePreference.asReadonly();

  readonly resolvedTheme = computed<ResolvedTheme>(() => {
    const preference = this.themePreference();

    return preference === 'system' ? this.systemTheme() : preference;
  });

  private readonly onSystemThemeChange = (event: MediaQueryListEvent): void => {
    if (this.themePreference() !== 'system') {
      return;
    }

    this.systemTheme.set(event.matches ? 'dark' : 'light');
    this.applyTheme();
  };

  constructor() {
    this.applyTheme();

    this.mediaQuery?.addEventListener('change', this.onSystemThemeChange);

    this.destroyRef.onDestroy(() => {
      this.mediaQuery?.removeEventListener('change', this.onSystemThemeChange);
    });
  }

  setTheme(mode: ThemeMode): void {
    if (mode === 'system') {
      this.systemTheme.set(this.mediaQuery?.matches ? 'dark' : 'light');
    }

    this.themePreference.set(mode);
    this.persistPreference(mode);
    this.applyTheme();
  }

  private getMediaQuery(): MediaQueryList | null {
    try {
      return this.document.defaultView?.matchMedia?.(DARK_MODE_QUERY) ?? null;
    } catch {
      return null;
    }
  }

  private readStoredPreference(): ThemeMode {
    try {
      const stored = this.document.defaultView?.localStorage.getItem(THEME_STORAGE_KEY);

      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
      }
    } catch {
      // storage may be unavailable/blocked
    }

    return 'system';
  }

  private persistPreference(mode: ThemeMode): void {
    try {
      this.document.defaultView?.localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      // selected theme still works for the current session
    }
  }

  private applyTheme(): void {
    this.document.documentElement.setAttribute('data-theme', this.resolvedTheme());
  }
}
