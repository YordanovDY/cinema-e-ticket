import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';
import { UserService } from '../../user/user.service';
import { VoidFn } from '../../types/functions';
import { FirstLetterPipe } from '../../pipes/first-letter.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ProfileDropdownComponent, FirstLetterPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  dropDownMenu:boolean = false;
  unsubFnArray: VoidFn[] = [];

  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.unsubFnArray.push(this.showMenu);
  }

  get username(): string {
    return this.userService.user?.username || '';
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  showMenu(): void {
    this.dropDownMenu = !this.dropDownMenu;
  }

  // logout() {
  //   this.userService.logout();
  // }

  ngOnDestroy(): void {
    this.unsubFnArray.forEach(funct => funct());
  }
}
