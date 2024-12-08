import { Component, OnInit } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { NowShowingComponent } from "./now-showing/now-showing.component";
import { OurCinemaComponent } from "./our-cinema/our-cinema.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, NowShowingComponent, OurCinemaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  isAdmin = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isAdmin = this.route.snapshot.data['isAdmin'];
  }
}
