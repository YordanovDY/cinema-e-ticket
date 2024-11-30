import { Component } from '@angular/core';
import { UserService } from '../../../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './profile-dropdown.component.html',
  styleUrl: './profile-dropdown.component.css'
})
export class ProfileDropdownComponent {

  constructor(private userService: UserService, private router: Router) { }

  logout() {
    this.userService.logout()?.subscribe(() => {
      this.router.navigate(['/login']);
    })
  }

}
