import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderComponent } from '../shared/loader/loader.component';
import { ProjectionsComponent } from "./projections/projections.component";
import { MovieDetailsService } from './movie-details.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [LoaderComponent, ProjectionsComponent, AsyncPipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
  providers: [MovieDetailsService]
})
export class MovieDetailsComponent implements OnInit {
  get movie$() {
    return this.movieDetailsService.movie$;
  }

  get isLoading$() {
    return this.movieDetailsService.isLoading$;
  }

  constructor (
    private route: ActivatedRoute,
    private movieDetailsService: MovieDetailsService
  ) { }

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['movieId'];
    this.movieDetailsService.getSingleMovie(movieId);
  }
}
