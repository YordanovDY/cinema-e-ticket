import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  providers: [ApiService]
})
export class HeroComponent implements OnInit{
  text: string = ''
  isLoading = true;

  constructor(private api:ApiService, private userService: UserService) { }

  ngOnInit(): void {
    this.api.getInfoObject().subscribe(obj => {
      this.text = obj.heroText;
      this.isLoading = false;
    })
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get isAdmin(): boolean {
    return this.userService.isAdmin;
  }
}
