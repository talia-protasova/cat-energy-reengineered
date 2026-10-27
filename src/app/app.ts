import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LanguageSwitcher } from './shared/ui/language-switcher/language-switcher';
import { ThemeSwitcher } from './shared/ui/theme-switcher/theme-switcher';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeSwitcher, LanguageSwitcher],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
