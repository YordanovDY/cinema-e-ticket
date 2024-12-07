import { Injectable } from '@angular/core';
import { ShortMovie } from '../../types/movie';
import { ShortScreen } from '../../types/screen';
import { DateAndTime } from '../../types/dateAndTime';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ScheduleService {

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

    const body = {
      movie: movieObj,
      screen: screenObj,
      dateAndTime
    }

    return this.http.post('/api/classes/Projection', body);
  }
}
