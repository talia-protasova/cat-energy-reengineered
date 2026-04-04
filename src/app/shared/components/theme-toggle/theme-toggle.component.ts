import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  imports: [CommonModule],
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  protected currentTheme = this.themeService.current;

  toggle() {
    this.themeService.toggle();
  }
}
