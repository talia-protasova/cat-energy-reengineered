import { FormControl, FormGroup } from '@angular/forms';

export type ExtrasForm = {
  sugar: FormControl<boolean>;
  water: FormControl<boolean>;
  milk: FormControl<boolean>;
  vitamins: FormControl<boolean>;
};

export type ProgramForm = {
  name: FormControl<string>;
  weight: FormControl<number | null>;
  age: FormControl<number | null>;
  objective: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  comment: FormControl<string>;
  extras: FormGroup<ExtrasForm>;
};

export const PROGRAM_FORM_INITIAL_VALUES = {
  name: '',
  weight: null as number | null,
  age: null as number | null,
  objective: 'lose-weight' as string,
  email: '',
  phone: '',
  comment: '',
  extras: {
    sugar: true,
    water: false,
    milk: false,
    vitamins: false,
  },
};
