import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
export class HeroComponent implements OnInit {
  text: string = ''
  isLoading = true;
  isAdmin: boolean = false;

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(
    private api: ApiService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.api.getInfoObject().subscribe(obj => {
      this.text = obj.heroText;
      this.isLoading = false;
    })

    this.isAdmin = this.route.snapshot.data['isAdmin'];
  }

}
