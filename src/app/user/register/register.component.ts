import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, NgModel, NgModelGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmailDirective } from '../../directives/email.directive';
import { DOMAINS } from '../../constants';
import { PasswordsMatchingDirective } from '../../directives/passwords-matching.directive';
import { CommonFormValidatorsService } from '../../utils/validators/common-form-validators.service';
import { GroupValidator, SimpleValidator } from '../../types/functions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective, PasswordsMatchingDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers:[CommonFormValidatorsService]
})
export class RegisterComponent implements OnInit {
  domains = DOMAINS;
  isMissing: SimpleValidator | null = null;
  tooShort: SimpleValidator | null = null;
  invalidEmail: SimpleValidator | null = null;
  mismatchedPasswords: GroupValidator | null = null;

  constructor(private validator: CommonFormValidatorsService) { }
  ngOnInit(): void {
    this.isMissing = this.validator.isMissing;
    this.tooShort = this.validator.tooShort;
    this.invalidEmail = this.validator.invalidEmail;
    this.mismatchedPasswords = this.validator.mismatchedPasswords;
  }

  registerSubmitHandler(form: NgForm) {
    console.log(form);
    
  }
}
