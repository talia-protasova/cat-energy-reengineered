import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import {
  provideTransloco,
  Translation,
  TranslocoLoader,
  TranslocoService,
} from '@jsverse/transloco';
import { Observable, of } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { LanguageService } from './language.service';
import { SUPPORTED_LANGUAGES } from './language.types';

const STORAGE_KEY = 'cat-energy-language';

class TestTranslocoLoader implements TranslocoLoader {
  getTranslation(): Observable<Translation> {
    return of({});
  }
}

describe('LanguageService', () => {
  let root: HTMLElement;
  let storedLanguage: string | null;
  let browserLanguages: string[];
  let readThrows: boolean;
  let writeThrows: boolean;

  beforeEach(() => {
    root = document.createElement('html');

    storedLanguage = null;
    browserLanguages = ['en-US'];
    readThrows = false;
    writeThrows = false;

    const storage = {
      getItem(key: string): string | null {
        if (readThrows) {
          throw new Error('Storage read blocked');
        }

        return key === STORAGE_KEY ? storedLanguage : null;
      },

      setItem(key: string, value: string): void {
        if (writeThrows) {
          throw new Error('Storage write blocked');
        }

        if (key === STORAGE_KEY) {
          storedLanguage = value;
        }
      },
    };

    const mockDocument = {
      documentElement: root,
      defaultView: {
        localStorage: storage,
        navigator: {
          get languages() {
            return browserLanguages;
          },
          get language() {
            return browserLanguages[0] ?? 'en-US';
          },
        },
      },
    } as unknown as Document;

    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, useValue: mockDocument },
        provideTransloco({
          config: {
            availableLangs: [...SUPPORTED_LANGUAGES],
            defaultLang: 'en',
            fallbackLang: 'en',
            prodMode: true,
          },
          loader: TestTranslocoLoader,
        }),
      ],
    });
  });

  function createService(): LanguageService {
    return TestBed.inject(LanguageService);
  }

  it('uses the browser language when no preference is saved', () => {
    browserLanguages = ['ru-RU'];

    const service = createService();

    expect(service.activeLanguage()).toBe('ru');
    expect(root.lang).toBe('ru');
    expect(root.dir).toBe('ltr');
  });

  it('prioritizes a saved language over browser preferences', () => {
    storedLanguage = 'es';
    browserLanguages = ['ar-EG'];

    const service = createService();

    expect(service.activeLanguage()).toBe('es');
    expect(root.lang).toBe('es');
    expect(root.dir).toBe('ltr');
  });

  it('ignores an unsupported saved language', () => {
    storedLanguage = 'de';
    browserLanguages = ['ru-RU'];

    const service = createService();

    expect(service.activeLanguage()).toBe('ru');
  });

  it('uses the first supported language from browser preferences', () => {
    browserLanguages = ['de-DE', 'fr-FR', 'ar-EG'];

    const service = createService();

    expect(service.activeLanguage()).toBe('ar');
    expect(root.lang).toBe('ar');
    expect(root.dir).toBe('rtl');
  });

  it('falls back to English when no supported language is found', () => {
    browserLanguages = ['de-DE', 'fr-FR'];

    const service = createService();

    expect(service.activeLanguage()).toBe('en');
    expect(root.lang).toBe('en');
    expect(root.dir).toBe('ltr');
  });

  it('does not persist automatically detected browser preferences', () => {
    browserLanguages = ['ar-EG'];

    createService();

    expect(storedLanguage).toBeNull();
  });

  it('switches languages and persists the user preference', () => {
    const service = createService();

    service.setLanguage('ru');

    expect(service.activeLanguage()).toBe('ru');
    expect(storedLanguage).toBe('ru');
    expect(root.lang).toBe('ru');
  });

  it('switches the document direction when entering RTL mode', () => {
    const service = createService();

    service.setLanguage('ar');

    expect(root.lang).toBe('ar');
    expect(root.dir).toBe('rtl');
  });

  it('restores LTR direction when leaving RTL mode', () => {
    const service = createService();

    service.setLanguage('ar');
    expect(root.dir).toBe('rtl');

    service.setLanguage('en');

    expect(root.lang).toBe('en');
    expect(root.dir).toBe('ltr');
  });

  it('synchronizes the document when Transloco changes language directly', () => {
    createService();

    const transloco = TestBed.inject(TranslocoService);

    transloco.setActiveLang('ar');

    expect(root.lang).toBe('ar');
    expect(root.dir).toBe('rtl');
  });

  it('falls back to browser preferences when storage cannot be read', () => {
    readThrows = true;
    browserLanguages = ['es-ES'];

    const service = createService();

    expect(service.activeLanguage()).toBe('es');
  });

  it('continues switching languages when storage cannot be written', () => {
    const service = createService();

    writeThrows = true;

    expect(() => service.setLanguage('ar')).not.toThrow();

    expect(service.activeLanguage()).toBe('ar');
    expect(root.dir).toBe('rtl');
  });
});
