import { AbstractControl, ValidationErrors } from '@angular/forms';

export type ValidatorOneParam = (
  control: AbstractControl
) => ValidationErrors | null;
