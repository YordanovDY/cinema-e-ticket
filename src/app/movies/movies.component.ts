import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from "../shared/loader/loader.component";
import { RouterLink } from '@angular/router';
import { PaginatorComponent } from "../shared/paginator/paginator.component";
import { MoviesService } from './movies.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    LoaderComponent,
    RouterLink,
    PaginatorComponent,
    AsyncPipe
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
  providers: [MoviesService]
})
export class MoviesComponent implements OnInit {
  get isLoading$() {
    return this.moviesService.isLoading$;
  }

  get movies$() {
    return this.moviesService.movies$;
  }

  constructor(private moviesService: MoviesService) { };

  ngOnInit(): void {
    this.moviesService.getMovies();
  }
}
