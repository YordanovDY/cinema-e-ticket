import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonFormValidatorsService } from '../../utils/validators/common-form-validators.service';
import { SimpleValidator } from '../../types/functions';
import { UserService } from '../user.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [CommonFormValidatorsService]
})
export class LoginComponent implements OnInit {

  isMissing: SimpleValidator | null = null;
  tooShort: SimpleValidator | null = null;

  constructor(
    private validator: CommonFormValidatorsService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isMissing = this.validator.isMissing;
    this.tooShort = this.validator.tooShort;
  }

  loginSubmitHandler(form: NgForm){
    if(form.invalid) {
      return
    }
    
    const {username, password} = form.value;
    
    this.userService.login(username, password).subscribe(() => {
        this.router.navigate(['/home']);
    })
  }
}
