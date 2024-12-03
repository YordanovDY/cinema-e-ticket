import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ratingValidator } from '../utils/validators/rating.validator';

@Directive({
  selector: '[appRating]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: RatingDirective
    }
  ]
})
export class RatingDirective implements Validator{

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const validatorFn = ratingValidator();

    return validatorFn(control);
  }
}
