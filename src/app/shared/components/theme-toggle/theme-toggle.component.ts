import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: ` <button (click)="toggle()">Toggle theme</button> `,
})
export class ThemeToggleComponent {
  constructor(private theme: ThemeService) {}

  toggle() {
    this.theme.toggle();
  }
}
