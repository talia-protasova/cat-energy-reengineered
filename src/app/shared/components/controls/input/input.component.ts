import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-input',
  imports: [NgxMaskDirective],
  host: {
    '[attr.id]': 'null',
  },
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly type = input<string>('text');
  readonly placeholder = input<string>('');
  readonly required = input<boolean>(false);
  readonly hasError = input<boolean>(false);
  readonly errorText = input<string>('');
  readonly errorId = input<string>('');
  readonly autocomplete = input<string>('off');
  readonly inputmode = input<string>('');
  readonly mask = input<string>('');
  readonly iconHref = input<string>('');
  readonly iconViewBox = input<string>('0 0 20 20');
  readonly iconWidth = input<number>(20);
  readonly iconHeight = input<number>(20);

  readonly value = signal<string | number | null>('');
  disabled = false;

  private onChange: (value: string | number | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(val: string | number | null): void {
    this.value.set(val);
  }

  registerOnChange(fn: (value: string | number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const val =
      this.type() === 'number'
        ? input.value === ''
          ? null
          : +input.value
        : input.value;
    this.value.set(val);
    this.onChange(val);
  }
}
