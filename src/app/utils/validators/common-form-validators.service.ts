import { Injectable } from '@angular/core';
import { NgModel, NgModelGroup } from '@angular/forms';

@Injectable()
export class CommonFormValidatorsService {

  constructor() { }

  isMissing(control: NgModel): boolean {
    return control.touched && control.errors?.['required'];
  }

  tooShort(control: NgModel): boolean{
    return control.touched && control.errors?.['minlength'];
  }

  invalidEmail(control: NgModel): boolean {
    return control.touched && control.errors?.['emailValidator'];
  }

  mismatchedPasswords(control: NgModel,controlGroup: NgModelGroup): boolean {
    return control.touched && controlGroup.control.errors?.['passMatchingValidator'];
  }
}
