import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../types/movie';
import { HttpClient } from '@angular/common/http';
import { Options } from '../types/apiOptions';
import { environment } from '../../environments/environment.development';

@Injectable()
export class MovieDetailsService {
  private headers = {
    'X-Parse-Application-Id': environment.APP_ID,
    'X-Parse-REST-API-Key': environment.REST_API_KEY,
  }

  private movie$$ = new BehaviorSubject<Movie | null>(null);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public movie$ = this.movie$$.asObservable();
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private http: HttpClient) { }

  getSingleMovie(movieId: string) {
    const options: Options = { headers: { ...this.headers } };

    this.isLoading$$.next(true);

    this.http.get<Movie>(`/api/classes/Movie/${movieId}`, options).subscribe((movie) => {
      this.movie$$.next(movie);
      this.isLoading$$.next(false);
    })
  }

  deleteMovie(movieId: string) {
    const sessionToken = localStorage.getItem('[SessionToken]');
    const options: Options = {
      headers:
      {
        ...this.headers,
        'X-Parse-Session-Token': sessionToken,
        'Content-Type': 'application/json',
      }
    };

    return this.http.delete<Movie>(`/api/classes/Movie/${movieId}`, options)
  }
}
