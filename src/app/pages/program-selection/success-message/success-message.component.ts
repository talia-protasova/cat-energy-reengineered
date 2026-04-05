import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-success-message',
  imports: [],
  templateUrl: './success-message.component.html',
  styleUrl: './success-message.component.scss',
})
export class SuccessMessageComponent {
  readonly title = input<string>('Request sent!');
  readonly text = input<string>('');
  readonly buttonLabel = input<string>('Submit another request');

  readonly reset = output<void>();
}
