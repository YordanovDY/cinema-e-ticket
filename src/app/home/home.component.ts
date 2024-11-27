import { Component } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { NowShowingComponent } from "./now-showing/now-showing.component";
import { OurCinemaComponent } from "./our-cinema/our-cinema.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, NowShowingComponent, OurCinemaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
