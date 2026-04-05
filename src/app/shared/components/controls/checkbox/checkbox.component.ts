import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  imports: [],
  host: {
    '[attr.id]': 'null',
  },
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly checked = input<boolean>(false);
  readonly disabled = input<boolean>(false);

  readonly changed = output<boolean>();
  readonly blurred = output<void>();

  onToggle(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.changed.emit(input.checked);
  }
}
