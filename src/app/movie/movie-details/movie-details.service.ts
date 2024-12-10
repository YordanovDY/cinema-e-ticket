import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../types/movie';

@Injectable()
export class MovieDetailsService {

  private movie$$ = new BehaviorSubject<Movie | null>(null);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public movie$ = this.movie$$.asObservable();
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private http: HttpClient) { }

  getSingleMovie(movieId: string) {
    this.isLoading$$.next(true);

    this.http.get<Movie>(`/api/classes/Movie/${movieId}`).subscribe((movie) => {
      this.movie$$.next(movie);
      this.isLoading$$.next(false);
    })
  }

  deleteMovie(movieId: string) {
    return this.http.delete<Movie>(`/api/classes/Movie/${movieId}`);
  }
}
