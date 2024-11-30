import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { B4AResponse } from './types/response';
import { Movie } from './types/movie';
import { Options } from './types/apiOptions';
import { Projection } from './types/projection';
import { INFO_KEY } from './constants';
import { InfoObject } from './types/infoObject';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers = {
    'X-Parse-Application-Id': environment.APP_ID,
    'X-Parse-REST-API-Key': environment.REST_API_KEY,
    'Content-Type': 'application/json'
  }

  constructor(private http: HttpClient) { }

  // getMovies(records?: number) {
  //   const options: Options = { headers: this.headers };

  //   if (records) {
  //     options['params'] = { order: '-createdAt', limit: records };
  //   }

  //   return this.http.get<B4AResponse>('/api/classes/Movie', options);
  // }

  getSingleMovie(movieId: string) {
    const options: Options = { headers: this.headers };

    return this.http.get<Movie>(`/api/classes/Movie/${movieId}`, options);
  }

  getProjections(movieId: string) {
    const options: Options = { headers: this.headers };
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

    return this.http.get<B4AResponse>('/api/classes/Projection', options);
  }

  getSingleProjection(projectionId: string) {
    const options: Options = { headers: this.headers };

    return this.http.get<Projection>(`/api/classes/Projection/${projectionId}`, options);
  }


  getPrices(){
    const options: Options = { headers: this.headers };

    return this.http.get<B4AResponse>('/api/classes/Price', options);
  }

  getInfoObject() {
    const URL = `/api/classes/Information/${INFO_KEY}`;
    const options: Options = { headers: this.headers };

    return this.http.get<InfoObject>(URL, options);
  }
}