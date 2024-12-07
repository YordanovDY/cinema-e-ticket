import { Component, OnInit } from '@angular/core';
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
  text: string = ''
  isLoading = true;
  isAdmin: boolean = false;

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(
    private infoService: InfoService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.infoService.getInfoObject().subscribe(obj => {
      this.text = obj.heroText;
      this.isLoading = false;
    })

    this.isAdmin = this.route.snapshot.data['isAdmin'];
  }

}
