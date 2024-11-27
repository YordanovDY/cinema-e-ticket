import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Movie } from '../types/movie';
import { LoaderComponent } from "../shared/loader/loader.component";
import { RouterLink } from '@angular/router';
import { PaginatorComponent } from "../shared/paginator/paginator.component";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [LoaderComponent, RouterLink, PaginatorComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
  movieList: Movie[] = [];
  isLoading = true;

  constructor(private api: ApiService) { };

  ngOnInit(): void {
    this.api.getMovies().subscribe(resp => {
      const movies: Movie[] = resp.results as Movie[];
      this.movieList = JSON.parse(JSON.stringify(movies));
      this.isLoading = false;
    });
  }
}
