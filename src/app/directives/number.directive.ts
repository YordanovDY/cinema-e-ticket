import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { numberValidator } from '../utils/validators/number.validator';

@Directive({
  selector: '[appNumber]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: NumberDirective
    }
  ]
})
export class NumberDirective implements Validator{

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const validatorFn = numberValidator()

    return validatorFn(control);
  }

}
