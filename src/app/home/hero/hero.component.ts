import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { UserService } from '../../user/user.service';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  providers: [InfoService]
})
export class HeroComponent implements OnInit {
  @Input('isAdmin') isAdmin = false;

  text: string = ''
  isLoading = true;

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(
    private infoService: InfoService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.infoService.getInfoObject().subscribe(obj => {
      this.text = obj.heroText;
      this.isLoading = false;
    })
  }

}
