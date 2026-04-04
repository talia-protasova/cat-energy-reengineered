import { Component, inject, signal } from '@angular/core';
import {
  Validators,
  ReactiveFormsModule,
  FormGroup,
  NonNullableFormBuilder,
} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { ProgramForm, PROGRAM_FORM_INITIAL_VALUES } from '../../core/models';
@Component({
  selector: 'app-program-selection',
  imports: [ReactiveFormsModule, NgxMaskDirective, LoaderComponent],
  templateUrl: './program-selection.component.html',
  styleUrl: './program-selection.component.scss',
  providers: [provideNgxMask()],
})
export class ProgramSelectionComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly isSubmitting = signal(false);
  readonly isSubmitted = signal(false);

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
