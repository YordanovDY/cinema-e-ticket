import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Options } from '../../types/apiOptions';

@Injectable()
export class AddScreenService {
  private headers = {
    'X-Parse-Application-Id': environment.APP_ID,
    'X-Parse-REST-API-Key': environment.REST_API_KEY,
  }

  constructor(private http: HttpClient) { }

  addScreen(name: string, rowsStr: string, seatsStr: string, scheduleStr: string){

    const rows = Number(rowsStr);
    const seats = Number(seatsStr);
    const schedule = Number(scheduleStr);

    const sessionToken = localStorage.getItem('[SessionToken]');
    const options: Options = {
      headers: {
        ...this.headers,
        'X-Parse-Session-Token': sessionToken,
        'Content-Type': 'application/json',
      },
    }

    const body = {
      name,
      rows,
      seatsPerRow: seats,
      projSchedule: schedule
    }

    return this.http.post('/api/classes/Screen', body, options);
  }

}
