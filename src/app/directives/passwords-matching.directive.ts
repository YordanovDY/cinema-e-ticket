import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NgModel, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPasswordsMatching]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: PasswordsMatchingDirective
    }
  ]
})
export class PasswordsMatchingDirective implements Validator {
  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const passwordValue = control.get('password')?.value;
    const repasswordValue = control.get('repassword')?.value;

    const areMatching = passwordValue === repasswordValue;
    if(areMatching) {
      return null;
    }
    
    return {passMatchingValidator: true};
  }
}
