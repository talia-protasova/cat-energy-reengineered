import { DOCUMENT } from '@angular/common';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';

import { DEFAULT_LANGUAGE, isSupportedLanguage, SupportedLanguage } from './language.types';

const LANGUAGE_STORAGE_KEY = 'cat-energy-language';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly transloco = inject(TranslocoService);

  readonly activeLanguage = this.transloco.activeLang;

  constructor() {
    this.transloco.langChanges$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((language) => {
      if (isSupportedLanguage(language)) {
        this.document.documentElement.lang = language;
        this.document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      }
    });

    this.transloco.setActiveLang(this.resolveInitialLanguage());
  }

  setLanguage(language: SupportedLanguage): void {
    this.transloco.setActiveLang(language);

    try {
      this.document.defaultView?.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // ignore storage errors; the language change has already been applied
    }
  }

  private resolveInitialLanguage(): SupportedLanguage {
    const savedLanguage = this.getSavedLanguage();

    if (savedLanguage) {
      return savedLanguage;
    }

    return this.getBrowserLanguage();
  }

  private getSavedLanguage(): SupportedLanguage | null {
    try {
      const savedLanguage = this.document.defaultView?.localStorage.getItem(LANGUAGE_STORAGE_KEY);

      return isSupportedLanguage(savedLanguage) ? savedLanguage : null;
    } catch {
      return null;
    }
  }

  private getBrowserLanguage(): SupportedLanguage {
    const navigator = this.document.defaultView?.navigator;

    if (!navigator) {
      return DEFAULT_LANGUAGE;
    }

    const browserLanguages = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];

    for (const locale of browserLanguages) {
      const language = locale.split(/[-_]/)[0]?.toLowerCase();

      if (isSupportedLanguage(language)) {
        return language;
      }
    }

    return DEFAULT_LANGUAGE;
  }
}
