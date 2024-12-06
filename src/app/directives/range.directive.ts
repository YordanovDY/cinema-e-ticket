import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { rangeValidator } from '../utils/validators/range.validator';

@Directive({
  selector: '[appRange]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: RangeDirective
    }
  ]
})
export class RangeDirective implements Validator{
  @Input('appRange') range: [number, number] = [1,10];

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const validatorFn = rangeValidator(this.range);

    return validatorFn(control);
  }
}
