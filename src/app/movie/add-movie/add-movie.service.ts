import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserPointer } from '../../types/user';

@Injectable()
export class AddMovieService {

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

    return this.http.post('/api/classes/Movie', body);
  }
}

