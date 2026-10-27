import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { ThemeService } from '../../../core/theme/theme.service';

@Component({
  selector: 'app-theme-switcher',
  imports: [TranslocoPipe],
  templateUrl: './theme-switcher.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcher {
  protected readonly theme = inject(ThemeService);

  protected setTheme(value: string): void {
    if (value === 'light' || value === 'dark' || value === 'system') {
      this.theme.setTheme(value);
    }
  }
}
