import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ProfileDropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 isLoggedIn = true;
 dropDownMenu = false

 constructor () {}

 showMenu():void {
  this.dropDownMenu = !this.dropDownMenu;
 }
}
