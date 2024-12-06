import { Injectable } from '@angular/core';
import { ShortMovie } from '../../types/movie';
import { ShortScreen } from '../../types/screen';
import { DateAndTime } from '../../types/dateAndTime';
import { environment } from '../../../environments/environment.development';
import { Options } from '../../types/apiOptions';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ScheduleService {
  private headers = {
    'X-Parse-Application-Id': environment.APP_ID,
    'X-Parse-REST-API-Key': environment.REST_API_KEY,
  }
  constructor(private http: HttpClient) { }

  addProjection(movie:string, screen:string, date:string, time:string){
    const [movieId, movieTitle] = movie.split('@@');

    const movieObj: ShortMovie = {
      id: movieId,
      title: movieTitle
    }

    const [screenName, rowsStr, seatsPerRowStr] = screen.split('@@');
    const rows = Number(rowsStr);
    const seatsPerRow = Number(seatsPerRowStr);

    const screenObj: ShortScreen = {
      name: screenName,
      rows:rows,
      seatsPerRow: seatsPerRow
    }

    let dateIsoString = new Date(date).toISOString();
    dateIsoString.replace('00:00:00', time);

    const dateAndTime: DateAndTime = {
      __type:'Date',
      iso: dateIsoString
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
      movie: movieObj,
      screen: screenObj,
      dateAndTime
    }

    return this.http.post('/api/classes/Projection', body, options);
  }
}
