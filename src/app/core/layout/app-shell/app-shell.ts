import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppFooter } from '../app-footer/app-footer';
import { AppHeader } from '../app-header/app-header';
import { LanguageSwitcher } from '../../../shared/ui/language-switcher/language-switcher';
import { SkipLink } from '../../../shared/ui/skip-link/skip-link';
import { ThemeSwitcher } from '../../../shared/ui/theme-switcher/theme-switcher';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, SkipLink, AppHeader, AppFooter, ThemeSwitcher, LanguageSwitcher],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShell {}
