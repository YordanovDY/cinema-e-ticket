import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
//!DELETE import { ApiService } from '../../api.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { MoviesService } from '../../movies/movies.service';
import { AsyncPipe } from '@angular/common';
//!DELETE import { Movie } from '../../types/movie';

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
    //!DELETE this.api.getMovies(4).subscribe(resp => {
    //   const movies: Movie[] = resp.results as Movie[];
    //   this.nowShowingMovies = JSON.parse(JSON.stringify(movies));
    //   this.isLoading = false;
    // })

    this.moviesService.getMovies(4);
  }
}
