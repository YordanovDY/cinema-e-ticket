import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Projection } from '../../types/projection';
import { environment } from '../../../environments/environment.development';
import { Options } from '../../types/apiOptions';
import { HttpClient } from '@angular/common/http';
import { B4AResponse } from '../../types/response';

@Injectable()
export class ProjectionsService {
  private headers = {
    'X-Parse-Application-Id': environment.APP_ID,
    'X-Parse-REST-API-Key': environment.REST_API_KEY,
  }

  private projections$$ = new BehaviorSubject<Projection[] | null>(null);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public projections$ = this.projections$$.asObservable();
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private http: HttpClient) { }

  getProjections(movieId: string) {
    const options: Options = { headers: { ...this.headers } };
    const now = new Date().toISOString();

    const query = {
      "movie.id": movieId,
      "dateAndTime": {
        "$gte": {
          "__type": "Date",
          "iso": now
        }
      }
    }

    options['params'] = { where: JSON.stringify(query) };

    this.isLoading$$.next(true);

    this.http.get<B4AResponse>('/api/classes/Projection', options).subscribe((resp) => {
      const projections: Projection[] = resp.results as Projection[];

      this.projections$$.next(projections);
      this.isLoading$$.next(false);
    });
  }
}
