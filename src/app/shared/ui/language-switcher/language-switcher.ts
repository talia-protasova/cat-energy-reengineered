import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { LanguageService } from '../../../core/i18n/language.service';
import { isSupportedLanguage } from '../../../core/i18n/language.types';

@Component({
  selector: 'app-language-switcher',
  imports: [TranslocoPipe],
  templateUrl: './language-switcher.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcher {
  protected readonly language = inject(LanguageService);

  protected setLanguage(value: string): void {
    if (isSupportedLanguage(value)) {
      this.language.setLanguage(value);
    }
  }
}
