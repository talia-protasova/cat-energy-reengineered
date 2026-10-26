import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ThemeService } from './theme.service';

const STORAGE_KEY = 'cat-energy-theme';

describe('ThemeService', () => {
  let systemIsDark: boolean;
  let systemChangeListener: ((event: MediaQueryListEvent) => void) | undefined;

  let mediaQuery: MediaQueryList;

  function changeSystemTheme(isDark: boolean): void {
    systemIsDark = isDark;

    systemChangeListener?.({
      matches: isDark,
    } as MediaQueryListEvent);
  }

  beforeEach(() => {
    systemIsDark = false;
    systemChangeListener = undefined;

    window.localStorage.removeItem(STORAGE_KEY);

    document.documentElement.removeAttribute('data-theme');
    document.documentElement.style.removeProperty('color-scheme');

    mediaQuery = {
      get matches() {
        return systemIsDark;
      },

      addEventListener: vi.fn((eventName: string, listener: EventListenerOrEventListenerObject) => {
        if (eventName === 'change' && typeof listener === 'function') {
          systemChangeListener = listener as (event: MediaQueryListEvent) => void;
        }
      }),

      removeEventListener: vi.fn(),
    } as unknown as MediaQueryList;

    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => mediaQuery),
    );
  });

  afterEach(() => {
    TestBed.resetTestingModule();

    vi.restoreAllMocks();
    vi.unstubAllGlobals();

    window.localStorage.removeItem(STORAGE_KEY);

    document.documentElement.removeAttribute('data-theme');
    document.documentElement.style.removeProperty('color-scheme');
  });

  it('defaults to system preference', () => {
    const service = TestBed.inject(ThemeService);

    expect(service.preference()).toBe('system');
    expect(service.resolvedTheme()).toBe('light');
  });

  it('resolves the initial system preference', () => {
    systemIsDark = true;

    const service = TestBed.inject(ThemeService);

    expect(service.preference()).toBe('system');
    expect(service.resolvedTheme()).toBe('dark');
  });

  it('restores a valid saved preference', () => {
    window.localStorage.setItem(STORAGE_KEY, 'dark');

    const service = TestBed.inject(ThemeService);

    expect(service.preference()).toBe('dark');
    expect(service.resolvedTheme()).toBe('dark');
  });

  it('falls back to system for an invalid saved preference', () => {
    window.localStorage.setItem(STORAGE_KEY, 'invalid');

    const service = TestBed.inject(ThemeService);

    expect(service.preference()).toBe('system');
    expect(service.resolvedTheme()).toBe('light');
  });

  it('persists the selected preference', () => {
    const service = TestBed.inject(ThemeService);

    service.setTheme('dark');

    expect(service.preference()).toBe('dark');
    expect(service.resolvedTheme()).toBe('dark');
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('dark');

    service.setTheme('system');

    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('system');
  });

  it('restores the selected preference after service recreation', () => {
    const service = TestBed.inject(ThemeService);

    service.setTheme('dark');

    TestBed.resetTestingModule();

    const restoredService = TestBed.inject(ThemeService);

    expect(restoredService.preference()).toBe('dark');
    expect(restoredService.resolvedTheme()).toBe('dark');
  });

  it('reacts to system changes in system mode', () => {
    const service = TestBed.inject(ThemeService);

    changeSystemTheme(true);

    expect(service.resolvedTheme()).toBe('dark');

    changeSystemTheme(false);

    expect(service.resolvedTheme()).toBe('light');
  });

  it('ignores system changes in explicit modes', () => {
    const service = TestBed.inject(ThemeService);

    service.setTheme('light');

    changeSystemTheme(true);

    expect(service.resolvedTheme()).toBe('light');

    service.setTheme('dark');

    changeSystemTheme(false);

    expect(service.resolvedTheme()).toBe('dark');
  });

  it('reads the current system theme when returning to system mode', () => {
    const service = TestBed.inject(ThemeService);

    service.setTheme('light');

    changeSystemTheme(true);

    service.setTheme('system');

    expect(service.preference()).toBe('system');
    expect(service.resolvedTheme()).toBe('dark');
  });

  it('synchronizes the root theme attribute', () => {
    const service = TestBed.inject(ThemeService);
    const root = document.documentElement;

    service.setTheme('dark');

    expect(root.getAttribute('data-theme')).toBe('dark');

    service.setTheme('light');

    expect(root.getAttribute('data-theme')).toBe('light');
  });

  it('works when localStorage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage unavailable');
    });

    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage unavailable');
    });

    const service = TestBed.inject(ThemeService);

    expect(service.preference()).toBe('system');

    expect(() => service.setTheme('dark')).not.toThrow();

    expect(service.resolvedTheme()).toBe('dark');
  });

  it('removes the system listener when destroyed', () => {
    TestBed.inject(ThemeService);

    expect(mediaQuery.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));

    TestBed.resetTestingModule();

    expect(mediaQuery.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
