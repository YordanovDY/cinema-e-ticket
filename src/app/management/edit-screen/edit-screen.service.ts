import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Options } from '../../types/apiOptions';
import { Screen } from '../../types/screen';

@Injectable()
export class EditScreenService {
  private headers = {
    'X-Parse-Application-Id': environment.APP_ID,
    'X-Parse-REST-API-Key': environment.REST_API_KEY,
    'Content-Type': 'application/json'
  }

  constructor(private http: HttpClient) { }

  getSingleScreen(screenId: string){
    const options: Options = { headers: {...this.headers} };

    return this.http.get<Screen>(`/api/classes/Screen/${screenId}`, options);
  }

  editScreen(screenId: string, name: string, rowsStr: string, seatsStr: string, scheduleStr: string){

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

    return this.http.put(`/api/classes/Screen/${screenId}`, body, options);
  }
}
