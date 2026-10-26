import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ThemeService } from './core/theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('cat-energy-reengineered');

  readonly theme = inject(ThemeService);

  setTheme(value: string): void {
    if (value === 'light' || value === 'dark' || value === 'system') {
      this.theme.setTheme(value);
    }
  }
}
