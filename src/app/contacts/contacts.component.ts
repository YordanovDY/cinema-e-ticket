import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonFormValidatorsService } from '../utils/validators/common-form-validators.service';
import { SimpleValidator } from '../types/functions';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
  providers: [CommonFormValidatorsService]
})
export class ContactsComponent implements OnInit{
  isMissing: SimpleValidator | null = null;
  tooShort: SimpleValidator | null = null;

  constructor (private validator: CommonFormValidatorsService) { }

  ngOnInit(): void {
    this.isMissing = this.validator.isMissing;
    this.tooShort = this.validator.tooShort;
  }

  contactsSubmitHandler(form: NgForm) {
    console.log(form);
    
  }
}
