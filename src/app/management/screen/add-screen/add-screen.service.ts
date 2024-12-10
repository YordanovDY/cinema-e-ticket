import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AddScreenService {

  constructor(private http: HttpClient) { }

  addScreen(name: string, rowsStr: string, seatsStr: string, scheduleStr: string){
    const rows = Number(rowsStr);
    const seats = Number(seatsStr);
    const schedule = Number(scheduleStr);

    const body = {
      name,
      rows,
      seatsPerRow: seats,
      projSchedule: schedule
    }

    return this.http.post('/api/classes/Screen', body);
  }

}
