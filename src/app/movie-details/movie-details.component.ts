import { Component, OnInit } from '@angular/core';
import { Movie } from '../types/movie';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { LoaderComponent } from '../shared/loader/loader.component';
import { ProjectionsComponent } from "./projections/projections.component";

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [LoaderComponent, ProjectionsComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | null = null;
  isLoading = true;

  constructor (
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['movieId'];
    this.api.getSingleMovie(movieId).subscribe((currentMovie: Movie) => {
      this.movie = currentMovie;
      this.isLoading = false;
    })
  }
}
