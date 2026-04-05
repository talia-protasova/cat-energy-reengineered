import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-radio',
  imports: [],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
})
export class RadioComponent {
  readonly id = input.required<string>();
  readonly value = input.required<string>();
  readonly label = input.required<string>();
  readonly checked = input<boolean>(false);
  readonly disabled = input<boolean>(false);

  readonly changed = output<string>();
  readonly blurred = output<void>();

  onSelect(): void {
    if (this.disabled()) return;
    this.changed.emit(this.value());
  }
}
