import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonFormValidatorsService } from '../utils/validators/common-form-validators.service';
import { SimpleValidator } from '../types/functions';
import { UserService } from '../user/user.service';
import { ContactsService } from './contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
  providers: [
    CommonFormValidatorsService, 
    UserService,
    ContactsService
  ]
})
export class ContactsComponent implements OnInit{
  isMissing: SimpleValidator | null = null;
  tooShort: SimpleValidator | null = null;
  email: string = '';

  constructor (
    private validator: CommonFormValidatorsService,
    private userService: UserService,
    private contactsService: ContactsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isMissing = this.validator.isMissing;
    this.tooShort = this.validator.tooShort;
    this.userService.getProfile().subscribe(usr =>{
      this.email = usr?.email;
    })
  }

  contactsSubmitHandler(form: NgForm) {
    const {subject, message} = form.value;
    this.contactsService.sendMessage(subject,message,this.email).subscribe(
      () => {
        this.router.navigate(['/home']);
      }
    )
  }
}
