import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslocoService, TranslocoTestingModule } from '@jsverse/transloco';
import { beforeEach, describe, expect, it } from 'vitest';

import { App } from './app';
import { SUPPORTED_LANGUAGES } from './core/i18n/language.types';

const translations = {
  en: {
    theme: {
      label: 'Theme preference',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
    },
    language: { label: 'Language' },
  },
  ru: {
    theme: {
      label: 'Тема оформления',
      light: 'Светлая',
      dark: 'Тёмная',
      system: 'Как в системе',
    },
    language: { label: 'Язык' },
  },
  es: {
    theme: {
      label: 'Preferencia de tema',
      light: 'Claro',
      dark: 'Oscuro',
      system: 'Según el sistema',
    },
    language: { label: 'Idioma' },
  },
  ar: {
    theme: {
      label: 'تفضيلات المظهر',
      light: 'فاتح',
      dark: 'داكن',
      system: 'حسب إعدادات النظام',
    },
    language: { label: 'اللغة' },
  },
};

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        App,
        TranslocoTestingModule.forRoot({
          langs: translations,
          translocoConfig: {
            availableLangs: [...SUPPORTED_LANGUAGES],
            defaultLang: 'en',
            fallbackLang: 'en',
            reRenderOnLangChange: true,
            prodMode: true,
          },
          preloadLangs: true,
        }),
      ],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  async function createApp(): Promise<ComponentFixture<App>> {
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();

    TestBed.inject(TranslocoService).setActiveLang('en');

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    return fixture;
  }

  it('should create the app', async () => {
    const fixture = await createApp();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the application shell', () => {
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('app-shell')).not.toBeNull();
    expect(element.querySelector('app-header')).not.toBeNull();
    expect(element.querySelector('main#main-content')).not.toBeNull();
    expect(element.querySelector('app-footer')).not.toBeNull();
  });

  it('should render accessible theme and language selectors', async () => {
    const fixture = await createApp();
    const element = fixture.nativeElement as HTMLElement;

    const themeLabel = element.querySelector<HTMLLabelElement>('label[for="theme-mode"]');
    const languageLabel = element.querySelector<HTMLLabelElement>('label[for="language-select"]');

    expect(themeLabel?.textContent?.trim()).toBe('Theme preference');
    expect(languageLabel?.textContent?.trim()).toBe('Language');

    expect(element.querySelector('#theme-mode')).toBeTruthy();
    expect(element.querySelector('#language-select')).toBeTruthy();
  });

  it('should switch translations and document direction', async () => {
    const fixture = await createApp();
    const element = fixture.nativeElement as HTMLElement;

    const select = element.querySelector<HTMLSelectElement>('#language-select')!;

    select.value = 'ar';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const label = element.querySelector<HTMLLabelElement>('label[for="language-select"]');

    expect(label?.textContent?.trim()).toBe('اللغة');
    expect(document.documentElement.lang).toBe('ar');
    expect(document.documentElement.dir).toBe('rtl');

    select.value = 'en';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(document.documentElement.lang).toBe('en');
    expect(document.documentElement.dir).toBe('ltr');
  });

  it('should preserve the selected theme when changing language', async () => {
    const fixture = await createApp();
    const element = fixture.nativeElement as HTMLElement;

    const themeSelect = element.querySelector<HTMLSelectElement>('#theme-mode')!;
    const languageSelect = element.querySelector<HTMLSelectElement>('#language-select')!;

    themeSelect.value = 'dark';
    themeSelect.dispatchEvent(new Event('change', { bubbles: true }));

    fixture.detectChanges();

    expect(document.documentElement.dataset['theme']).toBe('dark');

    languageSelect.value = 'ar';
    languageSelect.dispatchEvent(new Event('change', { bubbles: true }));

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(themeSelect.value).toBe('dark');
    expect(document.documentElement.dir).toBe('rtl');
  });
});
