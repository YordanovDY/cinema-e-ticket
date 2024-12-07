import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Options } from '../../types/apiOptions';
import { Screen } from '../../types/screen';

@Injectable()
export class EditScreenService {

  constructor(private http: HttpClient) { }

  getSingleScreen(screenId: string){
    return this.http.get<Screen>(`/api/classes/Screen/${screenId}`);
  }

  editScreen(screenId: string, name: string, rowsStr: string, seatsStr: string, scheduleStr: string){

    const rows = Number(rowsStr);
    const seats = Number(seatsStr);
    const schedule = Number(scheduleStr);

    const body = {
      name,
      rows,
      seatsPerRow: seats,
      projSchedule: schedule
    }

    return this.http.put(`/api/classes/Screen/${screenId}`, body);
  }
}
