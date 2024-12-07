import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EditMovieService {

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

    const body = {
      title,
      description,
      genre,
      duration,
      rating,
      imgUrl: imageUrl,
      ageRestriction: restriction,
    }

    return this.http.put(`/api/classes/Movie/${movieId}`, body);
  }
}
