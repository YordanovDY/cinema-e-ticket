import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserPointer } from '../types/user';
import { environment } from '../../environments/environment.development';
import { Options } from '../types/apiOptions';

@Injectable()
export class AddMovieService {
  private headers = {
    'X-Parse-Application-Id': environment.APP_ID,
    'X-Parse-REST-API-Key': environment.REST_API_KEY,
  }

  constructor(private http: HttpClient) { }

  addMovie(
    userId: string,
    title: string,
    imageUrl: string,
    description: string,
    genre: string,
    durationStr: string,
    ratingStr: string,
    restriction?: string) {

    const duration = Number(durationStr);
    const rating = Number(ratingStr);
    const author: UserPointer = {
      __type: 'Pointer',
      className: '_User',
      objectId: userId
    }

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
      author
    }

    return this.http.post('/api/classes/Movie', body, options);
  }
}

