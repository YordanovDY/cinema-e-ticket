import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { MoviesService } from '../../movies/movies.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-now-showing',
  standalone: true,
  imports: [
    RouterLink,
    LoaderComponent,
    AsyncPipe
  ],
  templateUrl: './now-showing.component.html',
  styleUrl: './now-showing.component.css',
  providers: [MoviesService]
})
export class NowShowingComponent implements OnInit {
  get movies$() {
    return this.moviesService.movies$;
  }

  get isLoading$() {
    return this.moviesService.isLoading$;
  }

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getMovies(4);
  }
}
