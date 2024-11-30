import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../types/movie';
import { HttpClient } from '@angular/common/http';
import { B4AResponse } from '../types/response';
import { environment } from '../../environments/environment.development';
import { Options } from '../types/apiOptions';

@Injectable()
export class MoviesService {
  private headers = {
    'X-Parse-Application-Id': environment.APP_ID,
    'X-Parse-REST-API-Key': environment.REST_API_KEY,
  }

  private movies$$ = new BehaviorSubject<Movie[] | null>(null);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public movies$ = this.movies$$.asObservable();
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private http: HttpClient) { }

  getMovies(records?: number) {
    const options: Options = { headers: { ...this.headers } };

    if (records) {
      options['params'] = { order: '-createdAt', limit: records };
    }

    this.isLoading$$.next(true);

    this.http.get<B4AResponse>('/api/classes/Movie', options).subscribe((resp) => {
      const movies: Movie[] = resp.results as Movie[];
      this.movies$$.next(movies);

      this.isLoading$$.next(false);
    })
  }
}
