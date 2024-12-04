import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Options } from '../../types/apiOptions';

@Injectable()
export class EditMovieService {
  private headers = {
    'X-Parse-Application-Id': environment.APP_ID,
    'X-Parse-REST-API-Key': environment.REST_API_KEY,
  }

  constructor(private http: HttpClient) { }

  editMovie(
    movieId: string,
    title: string,
    imageUrl: string,
    description: string,
    genre: string,
    durationStr: string,
    ratingStr: string,
    restriction?: string) {

    const duration = Number(durationStr);
    const rating = Number(ratingStr);

    const sessionToken = localStorage.getItem('[SessionToken]');
    const options: Options = {
      headers: {
        ...this.headers,
        'X-Parse-Session-Token': sessionToken,
        'Content-Type': 'application/json',
      },
    }

    const body = {
      title,
      description,
      genre,
      duration,
      rating,
      imgUrl: imageUrl,
      ageRestriction: restriction,
    }

    return this.http.put(`/api/classes/Movie/${movieId}`, body, options);
  }
}
