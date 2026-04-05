import { Component, inject, signal } from '@angular/core';
import {
  Validators,
  ReactiveFormsModule,
  FormGroup,
  NonNullableFormBuilder,
} from '@angular/forms';
import { provideNgxMask } from 'ngx-mask';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { ProgramForm, PROGRAM_FORM_INITIAL_VALUES } from '../../core/models';
import { RadioComponent } from '../../shared/components/controls/radio/radio.component';
import { CheckboxComponent } from '../../shared/components/controls/checkbox/checkbox.component';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { InputComponent } from '../../shared/components/controls/input/input.component';
import { TextareaComponent } from '../../shared/components/controls/textarea/textarea.component';

@Component({
  selector: 'app-program-selection',
  imports: [
    ReactiveFormsModule,
    LoaderComponent,
    RadioComponent,
    CheckboxComponent,
    SuccessMessageComponent,
    InputComponent,
    TextareaComponent,
  ],
  templateUrl: './program-selection.component.html',
  styleUrl: './program-selection.component.scss',
  providers: [provideNgxMask()],
})
export class ProgramSelectionComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly isSubmitting = signal(false);
  readonly isSubmitted = signal(false);

  readonly objectiveOptions = [
    { value: 'lose-weight', label: 'Weight loss' },
    { value: 'gain-weight', label: 'Weight gain' },
    { value: 'need-advice', label: 'Not sure (need advice)' },
  ] as const;

  readonly extraOptions = [
    { id: 'sugar', label: 'Sugar substitute' },
    { id: 'water', label: 'Drinking water' },
    { id: 'milk', label: 'Milk' },
    { id: 'vitamins', label: 'Vitamins' },
  ] as const;

  get extrasControls() {
    return this.form.controls.extras.controls;
  }

  get emailError(): string {
    const errors = this.formControls.email.errors;
    if (!errors) return '';
    if (errors['required']) return 'Email is required';
    if (errors['email']) return 'Invalid email format';
    return '';
  }

  readonly form: FormGroup<ProgramForm> = this.fb.group({
    name: this.fb.control('', Validators.required),
    weight: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    age: this.fb.control<number | null>(null),
    objective: this.fb.control(PROGRAM_FORM_INITIAL_VALUES.objective),
    email: this.fb.control('', [Validators.required, Validators.email]),
    phone: this.fb.control('', Validators.required),
    comment: this.fb.control(''),
    extras: this.fb.group({
      sugar: this.fb.control(true),
      water: this.fb.control(false),
      milk: this.fb.control(false),
      vitamins: this.fb.control(false),
    }),
  });

  get formControls() {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);
      this.form.reset(PROGRAM_FORM_INITIAL_VALUES);
    }, 1500);
  }

  resetToForm(): void {
    this.isSubmitted.set(false);
    this.form.reset(PROGRAM_FORM_INITIAL_VALUES);
  }
}
